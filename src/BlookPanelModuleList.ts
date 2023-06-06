import { BlookPanel } from "./BlookPanel";
import { PanelModuleList } from "./lib/PanelItems";
import { PanelModule } from "./lib/PanelModule";
import { Config } from "./modules/ModuleManager";

class BlookPanelModuleList implements PanelModuleList {
    element: HTMLDivElement;
    blookPanel: BlookPanel;
    modules!: PanelModule[];

    constructor(blookPanel: BlookPanel, element: HTMLDivElement) {
        this.element = element;
        this.blookPanel = blookPanel;
    }

    unload() {
        if (this.modules === undefined) 
            return;
        this.modules.forEach(module => {
            if (module !== undefined)
                module.onShutdown();
        });
        this.element.innerHTML = "";
        this.modules = [];

    }

    load(scripts: PanelModule[]): void {
        this.modules = [];
        console.log(scripts)
        scripts.map((module, i) => {
            const element = document.createElement("div");
            module.onInit(this.blookPanel, element);
                console.log(`Loaded module ${module.id}`);
            if (Config.onLoadLog !== undefined) {
            }
            this.modules[i] = module;
            this.element.append(element)
            
        });
        console.log(this.modules)
    }

}
export {
    BlookPanelModuleList
}