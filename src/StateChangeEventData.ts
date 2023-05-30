import { AbstractStateChangeEventData as EventData } from "./lib/BlooketEvent";
import { DynamicObject } from "./lib/Utils";

export class StateChangeEventData implements EventData {
    readonly before: DynamicObject;
    readonly originalArguements: IArguments;
    arguements: IArguments;
    readonly time: number;
    isCanceled: boolean;

    constructor(before: DynamicObject, arguements: IArguments, time: number) {
        this.before = before;
        this.arguements = arguements;
        this.originalArguements = arguements;
        this.time = time;
        this.isCanceled = false;
    }
}
