import { AbstractStateChangeEventData } from "../../lib/BlooketEvent";
import { Panel } from "../../lib/Panel";
import { PanelModule } from "../../lib/module";

class OpChests implements PanelModule {
    id: string = "OpChests";
    isToggled: boolean = false;
    panel!: Panel;
    toggleButton!: HTMLButtonElement;

    onInit(panel: Panel, element: HTMLDivElement) {
        this.panel = panel;

        this.toggleButton = document.createElement("button");
        this.toggleButton.innerText = "Op Chests";
        this.onDisable()

        element.append(this.toggleButton);

        this.toggleButton.addEventListener("click", () => {
            if (this.isToggled) {
                this.onDisable();
                this.isToggled = false;
            } else {
                this.onEnable();
                this.isToggled = true;
            }
        });
    }

    onShutdown(): void {
        this.onDisable()
    }

    onEnable(): void {
        this.toggleButton.style.color = "green"
        this.panel.stateChangeEvent.quickSubscribe(this.id, (eventData: AbstractStateChangeEventData): AbstractStateChangeEventData => {
            let args = eventData.arguments[0];
            if ("choices" in args) {
                args.choices = [ // I am going to borrow this CrazyH
                    {
                        "type": "multiply",
                        "val": 100,
                        "text": "Multiply Gold!",
                        "blook": "Rainbow Astronaut"
                    },
                    {
                        "type": "swap",
                        "text": "SWAP!",
                        "blook": "Spooky Ghost"
                    },
                    {
                        "type": "gold",
                        "val": 1000000,
                        "text": "+1M Gold",
                        "blook": "Tim the Alien"

                    }
                ];
            };

            return eventData;
        })
    }
    onDisable(): void {
        this.toggleButton.style.color = "red"
        this.panel.stateChangeEvent.unsubscribe(this.id);
    }
}

export = OpChests
