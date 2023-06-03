"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.OpChests = void 0;
class OpChests {
    constructor() {
        this.name = "OpChests";
        this.isToggled = false;
    }
    onInit(panel, element) {
        this.panel = panel;
        element.innerHTML = `
            <button class="${this.name}-button">abc<button> 
        `;
        const button = element.getElementsByClassName(`${this.name}-button`)[0];
        button.addEventListener("click", () => {
            if (this.isToggled) {
                this.onDisable();
                this.isToggled = false;
            }
            else {
                this.onEnable();
                this.isToggled = true;
            }
        });
        console.log(element);
    }
    onShutdown() {
        this.onDisable();
    }
    onEnable() {
        this.panel.stateChangeEvent.quickSubscribe("opChests", (eventData) => {
            let args = eventData.arguments[0];
            if ("choices" in args) {
                args.choices = [
                    { type: 'nothing', text: 'Nothing!', blook: 'Fairy' },
                    { type: 'nothing', text: 'Nothing!', blook: 'Fairy' },
                    { type: 'nothing', text: 'Nothing!', blook: 'Fairy' }
                ];
                console.log(args);
            }
            ;
            return eventData;
        });
    }
    onDisable() {
        this.panel.stateChangeEvent.unsubscribe("opChests");
    }
}
exports.OpChests = OpChests;
