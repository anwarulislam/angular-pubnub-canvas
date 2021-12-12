import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { Action } from '../lib/action';
import QBoard from '../lib/qboard';

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

  @Input() option: WhiteBoardOption = {
    showToolbar: false,
    readonly: true
  };

  @Input() set fakeCursorPosition(event) {
    console.log(this.option)
    if (this.option.readonly) {
      this.changeFakeCursorPosition(event)
    }
  }

  @Output() cursorPosition = new EventEmitter<any>();

  canvasHeight: number = 600
  canvasWidth: number = 600


  baseBoard: HTMLCanvasElement;
  whiteBoard: HTMLCanvasElement;
  qboard: QBoard;

  constructor() { }

  ngOnInit(): void {

    this.baseBoard = this.baseCanvas.nativeElement;
    this.whiteBoard = this.canvas.nativeElement;

    this.initWhiteboard()
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
    canvasContainer.addEventListener('mousemove', (e) => {
      console.log(e)
      this.cursorPosition.emit(this.getRelativeCoords(e))
    })

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

  changeFakeCursorPosition(event) {
    let cursor: any = document.querySelector('.fakecursor')

    let { x, y, xp, yp } = event

    if (cursor) {
      cursor.style.left = this.qboard.canvasWidth * xp + 'px'
      cursor.style.top = this.qboard.canvasHeight * yp + 'px'
    }

  }

  getRelativeCoords(event) {
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
