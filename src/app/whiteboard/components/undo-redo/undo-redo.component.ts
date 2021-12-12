import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Action } from 'src/app/lib/action';

@Component({
  selector: 'app-undo-redo',
  templateUrl: './undo-redo.component.html',
  styleUrls: ['./undo-redo.component.scss']
})
export class UndoRedoComponent implements OnInit {

  @Input() canUndo: boolean;
  @Input() canRedo: boolean;
  @Output() onAction = new EventEmitter<Action>();

  constructor() { }

  ngOnInit(): void {
  }

  onClickButton(action: Action) {
    this.onAction.emit(action);
  }
}
