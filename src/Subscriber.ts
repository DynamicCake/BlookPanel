import { StateChangeEventData } from "./StateChangeEventData";
import { EventPriority } from "./lib/BlooketEvent";


export interface Subscriber {
    callback: (data: StateChangeEventData) => StateChangeEventData;
    priority: EventPriority;
}
