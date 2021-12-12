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
  showToolbar: boolean = false;
  fakeCursorPosition = {}

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
        this.fakeCursorPosition = messageObject.message;
        console.log(this.fakeCursorPosition)
      },
      presence: (presenceObject) => {
        console.log(presenceObject);
      }
    });
  }

}
