import './static/style.scss'
import { BlookPanelModuleList } from "./BlookPanelModuleList";
import { StateChangeEvent } from "./StateChangeEvent";
import { ApplicationHook, BlookPanelWindow } from "./lib/ApplicationHook";
import { BlooketHook } from "./BlooketHook";
import { Panel } from "./lib/Panel";
import { PanelElements } from "./lib/PanelInterface";
import { Config } from "./plugins/PluginManager";

export class BlookPanel implements Panel {

    stateChangeEvent!: StateChangeEvent;
    isHidden: boolean;

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
        this.isHidden = false;
        this.panelName = panelName;
        this.blooketWindow = window as unknown as BlookPanelWindow;

        this.applicationHook = new BlooketHook();
        this.checkDomain();
        this.panelElements = this.createElements();
        this.registerEvents()
        this.hook();
        this.pageChangeListenerId = this.addPageChangeListener();
        this.runScripts()

        const github = "https://github.com/DynamicCake/BlookPanel";
        console.log("%c💉 Blook Panel Injected!", "font-size:xx-large; color: red; text-shadow: 0.1rem 0.1rem 0 #000;")
        console.log(`%c⭐ Please star this project at ${github}`, "font-size: x-large; color: yellow; text-shadow: 0.1rem 0.1rem 0 #000;")

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

    private runScripts(): void {
        if (Config.version !== Panel.version) {
            throw new Error(`Config version is ${Config.version} but BlookPanel version is ${Panel.version}`)
        }
        let moduleList = Config.modules[window.location.pathname];
        if (moduleList === undefined) {
            console.warn(`No modules found for the path ${window.location.pathname}`);
            moduleList = [];
        } else {
            console.log("Found scripts!")
        }
        this.panelElements.modules.unload()
        this.panelElements.modules.load(moduleList)
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

        this.panelElements.minimizeButton.addEventListener('click', () => {
            this.toggleShow();
        })

        document.addEventListener("keydown", (event) => {
            if (event.key === Config.hideKey)
                this.toggleShow();
        });


        this.panelElements.rootElement.addEventListener('transitionend', () => {
            if (this.isHidden) {
                this.panelElements.rootElement.style.display = "none";
            } else {
                this.panelElements.rootElement.style.display = "block";
            }
        });
    }

    private toggleShow() {
        if (this.isHidden) {
            this.panelElements.rootElement.style.opacity = "1";
            this.isHidden = false;
        } else {
            this.panelElements.rootElement.style.opacity = "0"
            this.isHidden = true;
        }
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
