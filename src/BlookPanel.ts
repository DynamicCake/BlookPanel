import { BlookPanelModuleList } from "./BlookPanelModuleList";
import { StateChangeEvent } from "./StateChangeEvent";
import { ApplicationHook, BlookPanelWindow } from "./lib/ApplicationHook";
import { BlooketHook } from "./BlooketHook";
import { Panel } from "./lib/Panel";
import { Config } from "./lib/Config";
import { PanelElements } from "./lib/PanelInterface";
import config from './plugins/config.json'
import { PanelModule } from "./lib/module";

export class BlookPanel implements Panel {

    stateChangeEvent!: StateChangeEvent;
    config: Config 

    readonly panelElements: PanelElements
    readonly blooketWindow: BlookPanelWindow;
    readonly applicationHook: ApplicationHook;
    readonly panelName: string;
    private readonly pageChangeListenerId: NodeJS.Timer


    /**
     * Initializes the panel
     * @param panelName name to give to the panel's elements
     * @throws when panel is executed in the wrong domain or is already injected
     */
    constructor(panelName: string) {
        this.config = config
        this.panelName = panelName;
        this.blooketWindow = window as unknown as BlookPanelWindow;

        this.applicationHook = new BlooketHook();
        this.checkDomain();
        this.panelElements = this.createElements();
        this.registerEvents()
        this.hook();
        this.pageChangeListenerId = this.addPageChangeListener();
        this.runScripts()
    }

    cleanUp(rootElement: HTMLElement, reactHandler: Function, window: BlookPanelWindow) {
        rootElement.remove();
        this.applicationHook.unhookSetState(reactHandler);
        clearInterval(this.pageChangeListenerId)
        window.isPanelInjected = false;

        console.log("Successfully cleaned up!");
    }

    /**
     * The gateway to blooket hacking, gets a lot of the data (ex. state)
     * @returns {DynamicObject} The handler to access everything like `stateNode`
     */
    getReactHandler(): Record<string, any> {
        return Object.values(document.querySelector('#app > div > div')!)[1].children[1]._owner;
    }

    private addPageChangeListener(): NodeJS.Timer {
        let prevUrl = window.location.href;
        let id = setInterval(() => {
            const currentUrl = window.location.href;

            if (currentUrl !== prevUrl) {
                prevUrl = currentUrl;
                if (!this.applicationHook.isHooked(this.getReactHandler)) {
                    this.applicationHook.hookSetState(this.getReactHandler, this.stateChangeEvent);
                    this.applicationHook.hookOriginalSetState(this.getReactHandler)
                }
                this.runScripts()

            }
        }, 1000)

        return id;
    }
    private async runScripts(): Promise<void> {

        let config = this.config;
        if (config == undefined) {
            throw new Error("Cannot load new page scripts because config isn't initialized");
        }

        let scripts: PanelModule[] = [];
        const moduleList = config.modules[window.location.pathname];
        if (moduleList === undefined) {
            console.warn(`Cannot find module list with ${window.location.pathname}`);
            return;
        }
        for (const path of moduleList) {
            const modPath = "/src/mods/" + path
            try {
                // Intentional dynamic importing, if you have a better idea, please make an issue with a suggestion
                const script = await import(modPath); 
                scripts.push(script);
            } catch {
                console.error(`Cannot find script with path ${modPath} ${__dirname} ${__filename}`);
                continue;
            }
        }
        if (scripts.length === 0) {
            console.error("No modules were loaded");
        }

        this.panelElements.modules.load(scripts)

    }

    private checkDomain() {

        if (!/blooket\.com$/.test(window.location.hostname)) {
            alert("Please use this panel on blooket.com");
            throw new Error("Cannot initialize if hostname isn't blooket.com");
        }

        // Check if panel injected
        if (this.blooketWindow.isPanelInjected) {
            alert("Panel already injected! Aborting...");
            throw new Error("Panel already injected");
        }

    }

    private createElements(): PanelElements {

        const panelName = this.panelName

        const rootElement = document.createElement("div");
        rootElement.id = this.panelName;

        rootElement.innerHTML = `
            <div class="${panelName}-top-bar">
              <div class="${panelName}-text">
                <p>Blook Panel</p>
              </div>
              <div class="${panelName}-images">
                <button class="${panelName}-minimize"></button>
                <button class="${panelName}-close"></button>
              </div>
            </div>
            <div class="${panelName}-modules"></div>
        `;

        document.body.append(rootElement);

        const topBar = document.querySelector(`#${panelName} .${panelName}-top-bar`)!;
        const modules = new BlookPanelModuleList(
            this,
            document.querySelector(`#${panelName} .${panelName}-modules`)!
        )


        const closeButton = document.querySelector(`#${panelName} .${panelName}-top-bar .${panelName}-close`)!;
        closeButton.innerHTML = "x";
        const minimizeButton = document.querySelector(`#${panelName} .${panelName}-top-bar .${panelName}-minimize`)!;
        minimizeButton.innerHTML = "-";


        return {
            rootElement: rootElement,
            topBar: topBar as HTMLDivElement,
            modules: modules,
            closeButton: closeButton as HTMLButtonElement,
            minimizeButton: minimizeButton as HTMLButtonElement,
        }

    }

    private registerEvents() {
        this.makeDraggable(this.panelElements.rootElement, this.panelElements.topBar);

        this.panelElements.closeButton.addEventListener('click', () => {
            this.cleanUp(this.panelElements.rootElement, this.getReactHandler, this.blooketWindow);
        });

    }

    private hook() {
        this.stateChangeEvent = new StateChangeEvent();

        this.applicationHook.hookSetState(this.getReactHandler, this.stateChangeEvent);
        this.applicationHook.hookOriginalSetState(this.getReactHandler)
        this.blooketWindow.isPanelInjected = true;
    }

    /**
     * Makes the `mainDiv` draggable using `headerDiv`
     * @param {HTMLElement!} mainDiv
     * @param {HTMLElement!} headerDiv
    */
    private makeDraggable(mainDiv: HTMLElement, headerDiv: HTMLElement) {

        let offsetX: number, offsetY: number;
        let viewportWidth: number, viewportHeight: number;

        headerDiv.addEventListener('mousedown', function (e: { clientX: number; clientY: number; }) {
            // Calculate the offset between the mouse position and the top-left corner of the draggable div
            offsetX = e.clientX - mainDiv.offsetLeft;
            offsetY = e.clientY - mainDiv.offsetTop;

            // Get the viewport dimensions
            viewportWidth = window.innerWidth || document.documentElement.clientWidth;
            viewportHeight = window.innerHeight || document.documentElement.clientHeight;

            // Attach the mousemove and mouseup event listeners
            document.addEventListener('mousemove', handleDrag);
            document.addEventListener('mouseup', handleDragEnd);
        });

        function handleDrag(e: { clientX: number; clientY: number; }) {
            // Calculate the new position of the draggable div
            var newLeft = e.clientX - offsetX;
            var newTop = e.clientY - offsetY;

            // Restrict the movement within the viewport boundaries
            newLeft = Math.max(0, Math.min(newLeft, viewportWidth - mainDiv.offsetWidth));
            newTop = Math.max(0, Math.min(newTop, viewportHeight - mainDiv.offsetHeight));

            // Update the position of the draggable div
            mainDiv.style.left = newLeft + 'px';
            mainDiv.style.top = newTop + 'px';
        }

        function handleDragEnd() {
            // Remove the mousemove and mouseup event listeners
            document.removeEventListener('mousemove', handleDrag);
            document.removeEventListener('mouseup', handleDragEnd);
        }
    }
}
