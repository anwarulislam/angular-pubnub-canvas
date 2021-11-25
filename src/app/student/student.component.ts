import { Component, OnInit } from '@angular/core';
import * as Pubnub from 'pubnub';
import { PubnubService } from '../pubnub.service';

@Component({
  selector: 'app-student',
  templateUrl: './student.component.html',
  styleUrls: ['./student.component.scss']
})
export class StudentComponent implements OnInit {

  pubnub: Pubnub;
  messages: { name: string; text: string }[] = [];

  constructor(private pubnubService: PubnubService) { }

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

        this.messages = [...this.messages, messageObject.message];

      },
      presence: (presenceObject) => {
        console.log(presenceObject);
      }
    });
  }

}
