import { AbstractStateChangeEvent } from "./BlooketEvent"
import { ApplicationHook, BlookPanelWindow } from "./ApplicationHook"
import { PanelElements } from "./PanelInterface"

abstract class Panel {
    static readonly version: string = "1.0";
    abstract panelElements: PanelElements;

    abstract readonly blooketWindow: BlookPanelWindow;
    abstract readonly applicationHook: ApplicationHook;
    abstract readonly panelName: string;

    abstract stateChangeEvent: AbstractStateChangeEvent;

    /**
     * Shuts down and cleans up the panel, a module shouldn't need to call this
     */
    abstract cleanUp(rootElement: HTMLElement, reactHandler: Function, window: BlookPanelWindow): void

    /**
     * The gateway to blooket hacking, has most of the things you would need
     * @returns {any} The handler to access everything like `stateNode` (Type is any because it is very complex, will maybe make it a type)
     */
    abstract getReactHandler(): any
    

}

export {
    Panel
}