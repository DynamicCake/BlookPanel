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

    load(paths: string[]): void {
        this.paths = [];
        for (const path of paths) {
            const script: string | null = this.blookPanel.config.fileMap[path];
            if (script == null)
                console.error(`Script with path ${path} does not exist`);
            const module: PanelModule = eval(script);
            
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