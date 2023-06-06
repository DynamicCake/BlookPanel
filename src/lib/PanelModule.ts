import { Panel } from "./Panel";

abstract class PanelModule {
    /**
     * A name for a module, preferably unique
     */
    abstract id: string

    /**
     * Gets called when the panel uses this module
     * @param panel main panel object
     * @param element div that was assigned as a container for the panel's elements
     */
    abstract onInit(panel: Panel, element: HTMLDivElement): void

    /**
     * Gets called when the panel removes the module usually due to a new page being loaded
     */
    abstract onShutdown(): void
}

export {
    PanelModule
}