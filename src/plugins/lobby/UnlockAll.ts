import { Panel } from "../../lib/Panel";
import { PanelModule } from "../../lib/module";
import blooks from '../static/Blooks.json'

class UnlockAll implements PanelModule {
    id: string = "UnlockAll";
    onInit(panel: Panel, element: HTMLDivElement): void {
        if ("unlocks" in panel.getReactHandler().stateNode.state)
            panel.getReactHandler().stateNode.originalSetState({unlocks: blooks});
        else {
            console.warn("Cannot find unlocks list, is this being executed in the lobby?");
            return;
        }

        element.innerText = "Unlocked all blooks!";
        element.style.color = "green";
    }

    onShutdown(): void {}

}

export = UnlockAll