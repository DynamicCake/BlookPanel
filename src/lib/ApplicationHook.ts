import { AbstractFunctionCallEvent } from "./BlooketEvent"

abstract class ApplicationHook {

    static isInit = false;
    abstract events: EventMap

    /**
     * Gets the AbstractFunctionCallEvent from a string path.
     * Events are lazily loaded, so if the event exists, the function will return the event,
     * but if the event doesn't exist, it will be created.
     * @param path path from reactHandler to the function
     */
    abstract getEvent(path: string): AbstractFunctionCallEvent

    abstract cleanUp(): void
}

type EventMap = {
    [path: string]: AbstractFunctionCallEvent 
}

interface BlookPanelWindow extends Window {
    isPanelInjected: boolean
}

export {
    ApplicationHook,
    BlookPanelWindow
}