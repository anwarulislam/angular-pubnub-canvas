import { Component, OnInit } from '@angular/core';
import * as Pubnub from 'pubnub';
import { PubnubService } from '../pubnub.service';

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
    console.log(obj);
    this.pubnub.publish(
      {
        channel: 'public-channel',
        message: obj
      },
      function (status, response) {
        if (status.error) {
          console.log(status);
        } else {
          console.log(response);
        }
      }
    );
  }
}
