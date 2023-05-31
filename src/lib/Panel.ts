import { AbstractStateChangeEvent } from "./BlooketEvent"
import { ApplicationHook, BlookPanelWindow } from "./ApplicationHook"
import { PanelElements } from "./PanelInterface"
import { Config } from "./Config"

abstract class Panel {
    abstract panelElements: PanelElements

    abstract readonly blooketWindow: BlookPanelWindow
    abstract readonly applicationHook: ApplicationHook
    abstract readonly panelName: string
    abstract config: Config | undefined

    abstract stateChangeEvent: AbstractStateChangeEvent 

    abstract cleanUp(rootElement: HTMLElement, reactHandler: Function, window: BlookPanelWindow): void

    /**
     * The gateway to blooket hacking, gets a lot of the data (ex. state)
     * @returns {DynamicObject} The handler to access everything like `stateNode`
     */
    abstract getReactHandler(): Record<string, any>
    

}

export {
    Panel
}