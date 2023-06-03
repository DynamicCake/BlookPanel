import { AbstractStateChangeEventData as EventData } from "../lib/BlooketEvent";
import { Panel } from "../lib/Panel";
import { PanelModule } from "../lib/module";

class AllCorrect implements PanelModule {
    id: string = "AllCorrect";
    isToggled: boolean = false;
    panel!: Panel;
    element!: HTMLDivElement;
    toggleButton!: HTMLButtonElement;

    onInit(panel: Panel, element: HTMLDivElement): void {
        this.panel = panel;
        this.element = element;

        this.toggleButton = document.createElement("button");
        this.toggleButton.innerText = "All Correct";
        element.append(this.toggleButton);
        this.onDisable();

        this.toggleButton.addEventListener("click", (event) => {
            if (this.isToggled) {
                this.isToggled = false;
                this.onDisable();
            } else {
                this.isToggled = true;
                this.onEnable();
            }
        })
    }
    onShutdown(): void {
        this.onDisable();
    }

    private onEnable(): void {
        this.toggleButton.style.color = "green";
        this.panel.stateChangeEvent.quickSubscribe(this.id, (event: EventData): EventData => {
            const args = event.arguments[0];
            if ("question" in args) {
                args.question.correctAnswers = args.question.answers;
            }
            return event;
        })
    }

    private onDisable(): void {
        this.toggleButton.style.color = "red";
        this.panel.stateChangeEvent.unsubscribe(this.id);
    }

}

export = AllCorrect