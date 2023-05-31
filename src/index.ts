import './static/style.scss'
import { EventPriority } from "./EventPriority";
import { StateChangeEventData } from "./StateChangeEventData";
import { BlookPanel } from "./BlookPanel";

const panel = new BlookPanel("blook-panel");

/*
panel.stateChangeEvent.subscribe("test", {
    callback: function (data: StateChangeEventData): StateChangeEventData {
        console.log(data.arguements);
        return data;
    },
    priority: EventPriority.MONITOR
});
*/