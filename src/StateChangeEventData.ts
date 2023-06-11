import { EventData } from "./lib/BlooketEvent";
import { DynamicObject } from "./lib/Utils";

export class StateChangeEventData implements EventData {
    readonly originalArguments: IArguments;
    arguments: IArguments;
    readonly time: number;
    isCanceled: boolean;

    constructor(args: IArguments, time: number) {
        this.arguments = args;
        this.originalArguments = args;
        this.time = time;
        this.isCanceled = false;
    }
}
