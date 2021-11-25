// create injectable service for pubnub

import { Injectable } from "@angular/core";
import * as Pubnub from "pubnub";
import { BehaviorSubject } from "rxjs";

@Injectable({providedIn: "root"})

export class PubnubService {

    public pubnubSubject = new BehaviorSubject<Pubnub>(null)

    constructor() { }
}
