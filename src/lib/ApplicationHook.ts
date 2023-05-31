import { AbstractStateChangeEvent } from "./BlooketEvent"

abstract class ApplicationHook {

    setStateFunction!: Function

    /**
     * Hooks into the `setState` function to be able to make events
     * @param reactHandler react handler to hook into
     * @throws if the `setState` function is already hooked
     */
    abstract hookSetState(reactHandler: Function, stateChangeEvent: AbstractStateChangeEvent): void

    /**
     * Adds the original setState function in the stateNode
     * @param reactHandler react handler to hook into
     */
    abstract hookOriginalSetState(reactHandler: Function): void
    
    /**
     * Unhooks the `setState` function's event
     * @param reactHandler the handler to remove the hook from
     * @throws if the `setState` function isn't hooked
     */
    abstract unhookSetState(reactHandler: Function): void  

    /**
     * Checks if the setState function has been patched
     * @param reactHandler the hander to check if there is a hook
     */
    abstract isHooked(reactHandler: Function): boolean 

}


interface BlookPanelWindow extends Window {
    isPanelInjected: boolean
}

export {
    ApplicationHook,
    BlookPanelWindow
}