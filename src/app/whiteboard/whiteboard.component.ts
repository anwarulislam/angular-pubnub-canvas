import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { bufferCount, bufferTime, debounceTime, delay, distinctUntilChanged, fromEvent, interval, Subject, tap, timeout } from 'rxjs';
import { Action } from '../lib/action';
import QBoard from '../lib/qboard';
import { IPosition } from './position.model';
import { WhiteboardService } from './whiteboard.service';

export interface WhiteBoardOption {
  showToolbar?: boolean;
  readonly?: boolean;
}

@Component({
  selector: 'app-whiteboard',
  templateUrl: './whiteboard.component.html',
  styleUrls: ['./whiteboard.component.scss']
})
export class WhiteboardComponent implements OnInit {

  @ViewChild('baseBoard', { static: true }) baseCanvas: any;
  @ViewChild('whiteBoard', { static: true }) canvas: any;

  @Input() latency: number = 500;
  @Input() option: WhiteBoardOption = {
    showToolbar: false,
    readonly: true
  };

  @Output() cursorPosition = new EventEmitter<any>();

  canvasHeight: number = 600
  canvasWidth: number = 600


  baseBoard: HTMLCanvasElement;
  whiteBoard: HTMLCanvasElement;
  qboard: QBoard;

  mousePositions: IPosition[] = []

  constructor(private whiteboard: WhiteboardService) { }

  ngOnInit(): void {

    this.baseBoard = this.baseCanvas.nativeElement;
    this.whiteBoard = this.canvas.nativeElement;

    this.initWhiteboard()

    this.whiteboard.moveCursor$
      .pipe(
        tap(event => {
          console.log('moveCursor$', event)
          if (this.option.readonly) {
            this.changeFakeCursorPosition(event)
          }
        })
      )
      .subscribe()

    // this.whiteboard.moveCursor$.next(1);
    // this.whiteboard.moveCursor$.next(2);
    // this.whiteboard.moveCursor$.next(3);
    // this.whiteboard.moveCursor$.next(4);
    // this.whiteboard.moveCursor$.next(5);
    // this.whiteboard.moveCursor$.next(6);
    // this.whiteboard.moveCursor$.next(7);
    // this.whiteboard.moveCursor$.next(8);
    // this.whiteboard.moveCursor$.next(9);
    // this.whiteboard.moveCursor$.next(10);
    // this.whiteboard.moveCursor$.next(11);
  }


  initWhiteboard() {
    (window as any).qboard = new QBoard(
      this.whiteBoard as any,
      this.baseBoard as any,
      this.canvasWidth,
      this.canvasHeight,
    );

    this.qboard = (window as any).qboard;

    this.onAction(Action.Pen)

    let canvasContainer = document.querySelector('.canvas-container')

    fromEvent(canvasContainer, 'mousemove')
      .pipe(
        tap(e => {
          this.mousePositions.push(this.getRelativeCoords(e))
        }),
        // debounceTime(this.latency),
        // distinctUntilChanged(),
        // tap((event: KeyboardEvent) => {
        //   this.cursorPosition.emit(this.mousePositions)
        //   this.mousePositions = []
        // })
      )
      .subscribe();

    interval(this.latency).pipe(
      tap(() => {
        if (this.mousePositions.length > 0) {
          this.cursorPosition.emit(this.mousePositions)
          this.mousePositions = []
        }
      })
    ).subscribe()

    // add fake cursor to canvascontainer
    if (this.option.readonly) {
      this.addFakeCursor(canvasContainer)
    }

  }

  addFakeCursor(container) {
    let cursor = document.createElement('div')
    cursor.classList.add('fakecursor')
    container.appendChild(cursor)
  }

  onAction(action: Action) {
    this.qboard.action.doAction(action)
  }

  changeFakeCursorPosition(event: IPosition) {
    let cursor: any = document.querySelector('.fakecursor')

    let { x, y, xp, yp } = event

    if (cursor) {
      cursor.style.left = this.qboard.canvasWidth * xp + 'px'
      cursor.style.top = this.qboard.canvasHeight * yp + 'px'

      window.requestAnimationFrame
    }

  }

  getRelativeCoords(event): IPosition {
    let x = event.offsetX || event.layerX
    let y = event.offsetY || event.layerY

    let height = event.target.height
    let width = event.target.width

    return {
      x, y, height, width,
      xp: x / width,
      yp: y / height
    };
  }


}
