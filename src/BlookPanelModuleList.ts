import { BlookPanel } from "./BlookPanel";
import { PanelModuleList } from "./lib/PanelItems";
import { PanelModule } from "./lib/module";

class BlookPanelModuleList implements PanelModuleList {
    element: HTMLDivElement;
    blookPanel: BlookPanel;
    modules!: PanelModule[];

    constructor(blookPanel: BlookPanel, element: HTMLDivElement) {
        this.element = element;
        this.blookPanel = blookPanel;
    }

    unload() {
        this.modules.forEach(module => {
            if (module !== undefined)
                module.onShutdown();
        });
        this.modules = [];
    }

    load(scripts: PanelModule[]): void {
        this.modules = [];
        const elements: HTMLDivElement[] = [];
        scripts.map((module, i) => {
            const element = document.createElement("div");
            module.onInit(this.blookPanel, element);
            this.modules[i] = module;
            this.element.append(element)
            console.log(`Successfully loaded script ${module.name}`)
        })

    }

}
export {
    BlookPanelModuleList
}