import { Panel } from "./Panel";
import { PanelModule } from "./module"

abstract class PanelModuleList {
    abstract element: HTMLDivElement
    abstract blookPanel: Panel;
    abstract modules: PanelModule[];

    abstract load(scripts: PanelModule[]): void

    abstract unload(): void
}




export {
    PanelModuleList 
}