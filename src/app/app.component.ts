import { Component, OnInit } from '@angular/core';
import * as Pubnub from 'pubnub';
import { environment } from 'src/environments/environment';
import QBoard from './lib/qboard';
import { PubnubService } from './pubnub.service';

declare const PubNub: any;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  pubnubInitiated: boolean = false;
  pubnub: Pubnub;

  constructor(private pubnubService: PubnubService) { }

  ngOnInit() {
    // this.initPubnub();

    (window as any).qboard = new QBoard(
      document.querySelector("#QBoard"),
      document.querySelector("#BaseQBoard"),
      1600,
      900
    );
  }

  loadScript(url: string = 'https://cdn.pubnub.com/sdk/javascript/pubnub.4.29.5.min.js') {
    return new Promise((resolve, reject) => {
      console.log("preparing to load pubnub");
      let node = document.createElement('script');
      node.src = url;
      node.type = 'text/javascript';
      document.getElementsByTagName('head')[0].appendChild(node);
      node.onload = () => {
        resolve(PubNub);
      }
    });
  }

  initPubnub() {
    this.loadScript().then((data) => {

      const clientUUID = 'channel-1'

      this.pubnub = new PubNub({
        publishKey: environment.publishKey,
        subscribeKey: environment.subscribeKey,
        uuid: clientUUID,
      });

      this.pubnubInitiated = true;
      console.log("pubnub loaded");
      console.log(this.pubnubInitiated);

      this.pubnubService.pubnubSubject.next(this.pubnub);
    });
  }

}
