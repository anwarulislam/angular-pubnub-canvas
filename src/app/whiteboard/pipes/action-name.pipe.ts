import { Pipe } from "@angular/core";
import { Action, nameMap } from "src/app/lib/action";

@Pipe({
    name: "actionName"
})
export class ActionNamePipe {
    transform(value: any, args?: any): any {
        return this.actionName(value);
    }

    actionName(action: Action): string {
        const name = nameMap[action] ?? action;
        return name[0].toUpperCase() + name.slice(1);
    };
}