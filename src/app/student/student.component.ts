import { Component, OnInit } from '@angular/core';
import * as Pubnub from 'pubnub';
import { bufferCount, bufferTime, concatMap, delay, from, Observable, of, tap } from 'rxjs';
import { PubnubService } from '../pubnub.service';
import { IPosition } from '../whiteboard/position.model';
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

      this.listenForMessages();
    });

  }

  listenForMessages() {
    this.pubnub.subscribe({
      channels: ['public-channel'],
      withPresence: true
    });

    this.pubnub.addListener({
      message: (messageObject) => {
        this.fakeCursorPositions = messageObject.message;
        this.moveCursorFromEvents(this.fakeCursorPositions);
        // console.log(this.fakeCursorPositions)
      },
      presence: (presenceObject) => {
        console.log(presenceObject);
      }
    });
  }

  moveCursorFromEvents(arr: IPosition[]) {

    from(arr).pipe(
      concatMap(item => of(item).pipe(delay(500 / arr.length))),
      tap(item => this.whiteboard.moveCursor$.next(item))
    ).subscribe()

    // arr.forEach((position, i) => {
    //   this.whiteboard.moveCursor$.next(position);
    // });
  }

}
