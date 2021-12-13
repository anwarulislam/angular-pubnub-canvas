import { Component, OnInit } from '@angular/core';
import * as Pubnub from 'pubnub';
import { concatMap, delay, from, of, Subscription, tap } from 'rxjs';
import { PubnubService } from '../pubnub.service';
import { EventName, IPosition } from '../whiteboard/position.model';
import { WhiteboardService } from '../whiteboard/whiteboard.service';

@Component({
  selector: 'app-student',
  templateUrl: './student.component.html',
  styleUrls: ['./student.component.scss']
})
export class StudentComponent implements OnInit {

  pubnub: Pubnub;
  showToolbar: boolean = false;
  fakeCursorPositions: IPosition[] = []

  constructor(private pubnubService: PubnubService, private whiteboard: WhiteboardService) { }

  ngOnInit(): void {
    this.pubnubService.pubnubSubject.subscribe(pubnub => {
      this.pubnub = pubnub;

      this.listenForEvents();
    });

  }

  listenForEvents() {
    this.pubnub.subscribe({
      channels: ['public-channel'],
      withPresence: true
    });

    this.pubnub.addListener({
      message: (messageObject) => {
        console.log('messageObject', messageObject);
        this.handleEvents(messageObject.message);
      },
      presence: (presenceObject) => {
        console.log(presenceObject);
      }
    });
  }

  handleEvents(event) {
    switch (event.type) {
      case EventName.CURSOR_MOVE:
        this.handleCursorMovementEvent(event.target);
        break;
      case EventName.OBJECT_ADDED:
        console.log('cursor down', event);
        break;
      default:
        break;
    }
  }

  handleCursorMovementEvent(response) {
    this.fakeCursorPositions = response.message;
    this.moveCursorFromEvents(this.fakeCursorPositions);
  }


  cursorMoving$: Subscription[] = [];
  moveCursorFromEvents(arr: IPosition[]) {
    this.cursorMoving$.push(
      from(arr).pipe(
        concatMap(item => of(item).pipe(delay(500 / arr.length))),
        tap(item => this.whiteboard.moveCursor$.next(item))
      ).subscribe()
    )
  }

  ngOnDestroy() {
    this.cursorMoving$.forEach(sub => sub.unsubscribe());
  }

}
