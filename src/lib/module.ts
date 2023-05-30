import { Panel } from "./Panel";

abstract class PanelModule {
    abstract type: ModuleType 
    abstract name: string

    constructor(panel: Panel, element: HTMLDivElement | null) {
        throw new Error("Method not implemented.");
    }
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
    TRIGGER,
    TOGGLE
}

export {
    PanelModule,
    TriggerModule,
    ToggleModule,
    ModuleType
}