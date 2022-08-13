// create injectable service for pubnub

import { Injectable } from "@angular/core";
import * as Pubnub from "pubnub";
import { BehaviorSubject } from "rxjs";

declare const PubNub: any;

@Injectable({ providedIn: "root" })

export class PubnubService {

    public pubnubSubject = new BehaviorSubject<Pubnub>(null)

    constructor() { }


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

}
