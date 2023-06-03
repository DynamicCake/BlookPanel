import { Panel } from "./Panel";

abstract class PanelModule {
    abstract id: string

    abstract onInit(panel: Panel, element: HTMLDivElement): void

    abstract onShutdown(): void
}

export {
    PanelModule
}