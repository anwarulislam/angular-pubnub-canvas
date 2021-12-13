import { Component, OnInit } from '@angular/core';
import * as Pubnub from 'pubnub';
import { PubnubService } from '../pubnub.service';
import { EventName } from '../whiteboard/position.model';

@Component({
  selector: 'app-teacher',
  templateUrl: './teacher.component.html',
  styleUrls: ['./teacher.component.scss']
})
export class TeacherComponent implements OnInit {
  pubnub: Pubnub;
  text = '';

  constructor(private pubnubService: PubnubService) { }

  ngOnInit(): void {
    this.pubnubService.pubnubSubject.subscribe(pubnub => {
      this.pubnub = pubnub;
    });
  }

  publishCoordination(obj) {
    this.pubnub.publish(
      {
        channel: 'public-channel',
        message: {
          type: EventName.CURSOR_MOVE,
          target: obj
        }
      },
      function (status, response) {
        if (status.error) {
          console.log(status);
        } else {
          // console.log(response);
        }
      }
    );
  }

  onEventFire(e) {
    console.log(e);
    this.pubnub.publish(
      {
        channel: 'public-channel',
        message: e
      },
      function (status, response) {
        if (status.error) {
          console.log(status);
        } else {
          // console.log(response);
        }
      }
    );
  }

}
