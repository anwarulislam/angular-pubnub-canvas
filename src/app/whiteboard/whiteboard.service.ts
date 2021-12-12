import { Injectable } from "@angular/core";
import { Subject } from "rxjs";
import { IPosition } from "./position.model";

@Injectable({ providedIn: 'root' })
export class WhiteboardService {


    moveCursor$ = new Subject<IPosition | any>();

}