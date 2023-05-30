import { EventPriority } from "./EventPriority";
import { StateChangeEventData } from "./StateChangeEventData";


export interface Subscriber {
    callback: (data: StateChangeEventData) => StateChangeEventData;
    priority: EventPriority;
}
