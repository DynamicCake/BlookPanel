import { PanelModuleList } from "./lib/PanelItems";

class BlookPanelModuleList implements PanelModuleList {
    element: HTMLDivElement;

    constructor(element: HTMLDivElement) {
        this.element = element;
    }

    load(paths: string[]): void {

    }

}
export {
    BlookPanelModuleList
}