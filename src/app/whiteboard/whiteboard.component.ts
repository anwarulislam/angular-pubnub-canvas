import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { fromEvent, interval, tap } from 'rxjs';
import { Action } from '../lib/action';
import QBoard from '../lib/qboard';
import { EventName, IPosition } from './position.model';
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
  @Output() eventFired = new EventEmitter<any>();

  canvasHeight: number = 300
  canvasWidth: number = 400


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
      .pipe(tap(event => {
        if (this.option.readonly) {
          this.changeFakeCursorPosition(event)
        }
      }))
      .subscribe()
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


    // this.qboard.baseCanvas.on('mouse:move', (event) => {  console.log(event) })


    // this.qboard.baseCanvas.on('object:moving', this.emitObjectModifying)
    // this.qboard.baseCanvas.on('object:scaling', this.emitObjectModifying)
    // this.qboard.baseCanvas.on('object:rotating', this.emitObjectModifying)
    // this.qboard.baseCanvas.on('path:created', this.emitObjectModifying)
    this.qboard.baseCanvas.on(EventName.OBJECT_ADDED, (event) => { this.emitObjectCreated(event) })

    let canvasContainer = document.querySelector('.canvas-container')

    fromEvent(canvasContainer, 'mousemove').pipe(tap(e => {

      this.mousePositions.push(this.getRelativeCoords(e))

    })).subscribe();

    interval(this.latency).pipe(
      tap(() => {

        // console.log(this.qboard.history)

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

  emitObjectCreated(event) {
    this.eventFired.emit({
      type: EventName.OBJECT_ADDED,
      target: event?.target
    })
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

    let currentX = this.qboard.canvasWidth * xp
    let currentY = this.qboard.canvasHeight * yp

    if (cursor) {
      cursor.style.left = currentX + 'px'
      cursor.style.top = currentY + 'px'
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
