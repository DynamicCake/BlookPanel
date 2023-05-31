import { EventPriority } from "./src/EventPriority";
import { StateChangeEventData } from "./src/StateChangeEventData";


export interface Subscriber {
    callback: (data: StateChangeEventData) => StateChangeEventData;
    priority: EventPriority;
}
