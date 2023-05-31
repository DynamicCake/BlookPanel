import { PanelModuleList } from "./PanelItems"
import { AbstractStateChangeEvent } from "./BlooketEvent"
import { ApplicationHook, BlookPanelWindow } from "./ApplicationHook"

abstract class Panel {
    abstract rootElement: HTMLDivElement
    abstract topBar: HTMLDivElement
    abstract modules: PanelModuleList;
    abstract closeButton: HTMLButtonElement
    abstract minimizeButton: HTMLButtonElement
    abstract readonly blooketWindow: BlookPanelWindow
    abstract readonly applicationHook: ApplicationHook
    abstract readonly panelName: string

    abstract stateChangeEvent: AbstractStateChangeEvent 

    abstract cleanUp(rootElement: HTMLElement, reactHandler: Function, window: BlookPanelWindow): void

    /**
     * The gateway to blooket hacking, gets a lot of the data (ex. state)
     * @returns {DynamicObject} The handler to access everything like `stateNode`
     */
    getReactHandler(): Record<string, any> {
        return Object.values(document.querySelector('#app > div > div')!)[1].children[1]._owner;
    }

}

export {
    Panel
}