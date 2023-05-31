import { BlookPanel } from "./BlookPanel";
import { PanelModuleList } from "./lib/PanelItems";
import { PanelModule } from "./lib/Module";

class BlookPanelModuleList implements PanelModuleList {
    element: HTMLDivElement;
    blookPanel: BlookPanel;
    paths!: PanelModule[];

    constructor(blookPanel: BlookPanel, element: HTMLDivElement) {
        this.element = element;
        this.blookPanel = blookPanel;
    }

    load(scripts: string[]): void {
        debugger;
        this.paths = [];
        for (const script of scripts) {
            console.log(`Loaded ${script}`)
            const module: PanelModule = eval(script) as PanelModule;
            
            const element = document.createElement("div");
            element.innerHTML = module.name;
            module.init(this.blookPanel, this.element);
            this.element.append(element);
            this.paths.push(module);
        }
    }

}
export {
    BlookPanelModuleList
}