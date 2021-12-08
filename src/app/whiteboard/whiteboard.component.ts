import { Component, OnInit, ViewChild } from '@angular/core';
import QBoard from '../lib/qboard';

@Component({
  selector: 'app-whiteboard',
  templateUrl: './whiteboard.component.html',
  styleUrls: ['./whiteboard.component.scss']
})
export class WhiteboardComponent implements OnInit {

  @ViewChild('baseBoard', { static: true }) baseCanvas: any;
  @ViewChild('whiteBoard', { static: true }) canvas: any;

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
      800,
      800
    );

    this.qboard = (window as any).qboard;
  }

}
