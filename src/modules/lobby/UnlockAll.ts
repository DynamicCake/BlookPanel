import { Panel } from "../../lib/Panel";
import { PanelModule } from "../../lib/PanelModule";
import blooks from '../static/Blooks.json'

/**
 * Note: There is a better method of doing this, it can be found in DynamicCake/BlookPanel-Blooket-Cheats
 */
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