import { EventData } from "./lib/BlooketEvent";
import { DynamicObject } from "./lib/Utils";

export class StateChangeEventData implements EventData {
    readonly before: DynamicObject;
    readonly originalArguments: IArguments;
    arguments: IArguments;
    readonly time: number;
    isCanceled: boolean;

    constructor(before: DynamicObject, args: IArguments, time: number) {
        this.before = before;
        this.arguments = args;
        this.originalArguments = args;
        this.time = time;
        this.isCanceled = false;
    }
}
