import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WhiteboardComponent } from './whiteboard.component';
import { ContextMenuComponent } from './components/context-menu/context-menu.component';
import { ToolbarComponent } from './components/toolbar/toolbar.component';
import { ActionNamePipe } from './pipes/action-name.pipe';
import { TooltipModule } from '../shared/directives/tooltip.directive';
import { FasIconPipe } from './pipes/fas-icon.pipe';
import { UndoRedoComponent } from './components/undo-redo/undo-redo.component';



@NgModule({
  declarations: [
    WhiteboardComponent,
    ContextMenuComponent,
    ToolbarComponent,

    // Pipes
    ActionNamePipe,
     FasIconPipe,
     UndoRedoComponent
  ],
  exports: [WhiteboardComponent],
  imports: [
    CommonModule,
    TooltipModule
  ]
})
export class WhiteboardModule { }
