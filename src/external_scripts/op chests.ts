import { ModuleType, ToggleModule } from "../lib/Module";
import { AbstractStateChangeEventData } from "../lib/BlooketEvent";
import { Panel } from "../lib/Panel";

class OpChests implements ToggleModule {
    type: ModuleType = ModuleType.TOGGLE;
    name: string = "Op Chests";
    panel!: Panel;

    init(panel: Panel, element: HTMLDivElement) {
        this.panel = panel;
        console.log(element);
    }

    onEnable(): void {
        this.panel.stateChangeEvent.quickSubscribe("opChests", (eventData: AbstractStateChangeEventData): AbstractStateChangeEventData => {
            let args = eventData.arguements[0];
            if ("choices" in args) {
                args.choices = [
                    { type: 'nothing', text: 'Nothing!', blook: 'Fairy' },
                    { type: 'nothing', text: 'Nothing!', blook: 'Fairy' },
                    { type: 'nothing', text: 'Nothing!', blook: 'Fairy' }
                ];
                console.log(args);
            };


            return eventData;
        })
    }
    onDisable(): void {
        this.panel.stateChangeEvent.unsubscribe("opChests");
    }
}

export {
    OpChests
}