import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Action } from 'src/app/lib/action';
import { Tool, Tools } from 'src/app/lib/tools';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss']
})
export class ToolbarComponent implements OnInit {

  @Input() currentTool: Tool;
  @Input() tools: Tools;
  @Output() onAction = new EventEmitter<Action>();

  items: any[] = []

  constructor() { }

  ngOnInit(): void {
    this.items = [
      { tool: this.tools.Move, action: Action.Move },
      { tool: this.tools.Pen, action: Action.Pen },
      { tool: this.tools.Eraser, action: Action.Eraser },
      { tool: this.tools.Laser, action: Action.Laser },
      { tool: this.tools.Line, action: Action.Line },
      { tool: this.tools.Rectangle, action: Action.Rectangle },
      { tool: this.tools.Ellipse, action: Action.Ellipse },
    ];
  }

  onClickButton(action: Action) {
    this.onAction.emit(action);
  }

}
