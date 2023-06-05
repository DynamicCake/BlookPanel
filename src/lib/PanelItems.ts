import { Panel } from "./Panel";
import { PanelModule } from "./module"

abstract class PanelModuleList {
    abstract element: HTMLDivElement
    abstract blookPanel: Panel;
    abstract modules: PanelModule[];

    /**
     * Loads the modules provided, typically called when the webpage changes
     * @param scripts list of scripts that will be executed and loaded into the panel
     */
    abstract load(scripts: PanelModule[]): void

    /**
     * Unloads all the modules usually for other modules to load
     */
    abstract unload(): void
}




export {
    PanelModuleList 
}