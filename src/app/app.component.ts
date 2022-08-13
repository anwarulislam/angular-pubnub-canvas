import { Component, OnInit } from '@angular/core';
import * as Pubnub from 'pubnub';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  pubnub: Pubnub;

  constructor() { }

  ngOnInit() { }

}
