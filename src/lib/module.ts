import { Panel } from "./Panel";

abstract class PanelModule {
    abstract type: ModuleType 
    abstract name: string

    abstract init(panel: Panel, element: HTMLDivElement | null): void
}

abstract class TriggerModule extends PanelModule {
    type: ModuleType = ModuleType.TRIGGER

    abstract onTrigger(): void
}

abstract class ToggleModule extends PanelModule {
    type: ModuleType = ModuleType.TOGGLE

    abstract onEnable(panel: Panel): void
    abstract onDisable(): void
}

enum ModuleType {
    TRIGGER = "trigger",
    TOGGLE = "toggle"
}

export {
    PanelModule,
    TriggerModule,
    ToggleModule,
    ModuleType
}