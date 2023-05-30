import { AbstractStateChangeEvent } from "./BlooketEvent"

abstract class ApplicationHook {
    setStateFunction!: Function

    /**
     * Hooks into the `setState` function to be able to make events
     * @param reactHandler game's react handler
     * @throws if the `setState` function is already hooked
     */
    abstract hookSetState(reactHandler: Function, stateChangeEvent: AbstractStateChangeEvent): void

    /**
     * Unhooks the `setState` function's event
     * @param reactHandler the handler to remove the hook from
     * @throws if the `setState` function isn't hooked
     */
    abstract unhookSetState(reactHandler: Function): void  

    abstract isHooked(reactHandler: Function): boolean 

}


interface BlookPanelWindow extends Window {
    isPanelInjected: boolean
}

export {
    ApplicationHook,
    BlookPanelWindow
}