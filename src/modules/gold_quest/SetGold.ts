import { Panel } from "../../lib/Panel";
import { PanelModule } from "../../lib/PanelModule";

class SetGold implements PanelModule {
    id: string = "SetGold";
    onInit(panel: Panel, element: HTMLDivElement): void {
        const inputBox = document.createElement("input");
        const sendButton = document.createElement("button");
        sendButton.innerText = "Set Gold";

        sendButton.addEventListener("click", () => {
            const reactHandler = panel.getReactHandler;

            let props = reactHandler().stateNode.props;
            const value: number = Number(inputBox.value);
            if (Number.isNaN(value)) {
                sendButton.innerText = "Not a number";
                setTimeout(() => {
                    sendButton.innerText = "Set Gold";
                }, 1000)
                return;
            }

            props.liveGameController.setVal({
                path: "c/".concat(props.client.name),
                val: {
                    b: props.client.blook,
                    g: value,
                }
            });

            reactHandler().stateNode.originalSetState({ gold: value, gold2: value });

            sendButton.innerText = "Sent!";
            setTimeout(() => {
                sendButton.innerText = "Set Gold";
            }, 1000)
        });

        element.append(inputBox, sendButton);
    }

    onShutdown(): void { }
}

export = SetGold