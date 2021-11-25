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


  onComment(text) {
    console.log(text);

    this.pubnub.publish(
      {
        channel: 'public-channel',
        message: {
          name: 'Teacher',
          text: text
        },
      },
      function (status, response) {
        if (status.error) {
          console.log(status);
        } else {
          console.log(response);
        }
      }
    );

    this.text = '';
  }

}
