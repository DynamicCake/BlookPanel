import { Panel } from "./Panel";

abstract class PanelModule {
    abstract name: string

    abstract init(panel: Panel, element: HTMLDivElement): void
}

export {
    PanelModule
}