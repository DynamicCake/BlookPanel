import { EventData, EventPriority } from "../lib/BlooketEvent";
import { Panel } from "../lib/Panel";
import { PanelModule } from "../lib/PanelModule";

class HelloWorldModule implements PanelModule {
    // A preferably unique id
    id: string = "HelloWorld"; 
    panel!: Panel;
    subscriberId!: number;

    onInit(panel: Panel, element: HTMLDivElement): void {
        const p = document.createElement("p");
        p.innerText = `Hello World!`;
        // Add to the assigned section
        element.append(p);

        this.panel = panel;
        this.subscriberId = panel.stateChangeEvent.subscribe("HelloWorld", {
            callback: (data: EventData): EventData => {
                console.log("Hello StateChangeEvent", data);
                return data;
            },
            priority: EventPriority.MONITOR // We set it to monitor because we are not changing the event data
        });
    }
    onShutdown(): void {
        this.panel.stateChangeEvent.unsubscribeWithId(this.subscriberId);
    }

}

export = HelloWorldModule