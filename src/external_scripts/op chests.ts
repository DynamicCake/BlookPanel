import { ModuleType, ToggleModule } from "../lib/module";
import { BlookPanel } from "../BlookPanel";
import { AbstractStateChangeEventData } from "../lib/BlooketEvent";

class OpChests implements ToggleModule {
    type: ModuleType = ModuleType.TOGGLE;
    name: string = "Op Chests";
    panel: BlookPanel;

    constructor(panel: BlookPanel, element: HTMLDivElement) {
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
        throw new Error("Method not implemented.");
    }
}

export {
    OpChests
}