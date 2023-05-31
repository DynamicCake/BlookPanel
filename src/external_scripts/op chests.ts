import { AbstractStateChangeEventData } from "../lib/BlooketEvent";
import { PanelModule } from "../lib/Module";
import { Panel } from "../lib/Panel";

class OpChests implements PanelModule {
    name: string = "OpChests";
    isToggled: boolean = false;
    panel!: Panel;

    init(panel: Panel, element: HTMLDivElement) {
        this.panel = panel;
        element.innerHTML = `
            <button class="${this.name}-button">abc<button> 
        `
        const button = element.getElementsByClassName(`${this.name}-button`)[0] as HTMLButtonElement;
        button.addEventListener("click", () => {
            if (this.isToggled) {
                this.onDisable()
                this.isToggled = false;
            } else {
                this.onEnable()
                this.isToggled = true;
            }
        });

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