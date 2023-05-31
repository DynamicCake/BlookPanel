import { BlookPanelModuleList } from "./BlookPanelModuleList";
import { StateChangeEvent } from "./StateChangeEvent";
import { ApplicationHook, BlookPanelWindow } from "./lib/ApplicationHook";
import { BlooketHook } from "./BlooketHook";
import { Panel } from "./lib/Panel";
import JSZip from "jszip";
import { Config } from "./lib/Config";
import { PanelElements } from "./lib/PanelInterface";

export class BlookPanel implements Panel {

    panelElements!: PanelElements

    stateChangeEvent!: StateChangeEvent;
    config: Config | undefined

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
        this.panelName = panelName;
        this.blooketWindow = window as unknown as BlookPanelWindow;

        this.applicationHook = new BlooketHook();
        this.checkDomain();
        this.createElements();
        this.createFilePrompt();
        this.hook();
        this.pageChangeListenerId = this.addPageChangeListener();
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
            const curentUrl = window.location.href;

            if (curentUrl !== prevUrl) {
                prevUrl = curentUrl;
                if (!this.applicationHook.isHooked(this.getReactHandler)) {
                    this.applicationHook.hookSetState(this.getReactHandler, this.stateChangeEvent);
                    this.applicationHook.hookOriginalSetState(this.getReactHandler)
                }
                this.runScripts()

            }
        }, 1000)

        return id;
    }
    private runScripts() {

        let config = this.config;
        if (config == undefined) {
            throw new Error("Cannot load new page scripts because config isnt initialized");
        }

        let scripts = [];
        const moduleList = config.modules[window.location.pathname];
        if (moduleList === undefined) {
            console.log(config.modules)
            throw new Error(`Cannot find module list with ${window.location.pathname}`)
        }
        for (const path of moduleList) {
            const script = config.fileMap[path];
            if (script === undefined) {
                console.error(`Cannot find script with path ${path}`);
                continue;
            }
            scripts.push(script);
        }

        this.panelElements.modules.load(scripts)

    }

    private checkDomain() {

        if (!/blooket\.com$/.test(window.location.hostname)) {
            alert("Please use this panel on blooket.com");
            throw new Error("Cannot initialize if hostname isnt blooket.com");
        }

        // Check if panel injected
        if (this.blooketWindow.isPanelInjected) {
            alert("Panel already injected! Aborting...");
            throw new Error("Panel already injected");
        }

    }

    private createFilePrompt() {
        const panelName = this.panelName;

        this.panelElements.modules.element.innerHTML = `
            <div class="${panelName}-file-input"></div>
        `

        const fileInput: HTMLDivElement = document.querySelector(`#${panelName} .${panelName}-modules .${panelName}-file-input`)!;

        console.log(fileInput)

        fileInput.addEventListener("drop", (event: DragEvent) => {
            event.preventDefault();

            fileInput.classList.remove(`${panelName}-hover-over`)

            // Access the dropped files
            const file = event.dataTransfer!.files[0];

            let unziped: { [path: string]: string } = {};

            const reader = new FileReader();
            const zip = new JSZip();

            reader.onload = (e): void => {
                const fileData = e.target!.result;

                const decoder = new TextDecoder('utf-8');

                zip.loadAsync(fileData!)
                    .then((zipData) => {
                        const ps: Promise<void>[] = [];

                        zipData.forEach((relativePath: string, zipEntry) => {
                            if (!zipEntry.dir) {
                                const promise = zipEntry.async('uint8array')
                                    .then((fileContent) => {
                                        unziped[relativePath] = decoder.decode(fileContent);
                                    })
                                    .catch((error) => {
                                        fileInput.innerText = "Error: Cannot extract zip file";
                                        throw new Error(`Error extracting file: ${error}`);
                                    });

                                ps.push(promise);
                            }
                        });

                        return Promise.all(ps);
                    })
                    .then(() => {
                        loadConfig()
                    })
                    .catch((error) => {
                        fileInput.innerText = "Error: Cannot load zip file";
                        throw new Error(`Error loading ZIP file: ${error}`);
                    });
            };
            reader.readAsArrayBuffer(file);

            let loadConfig = () => {
                const configName = "config.json";
                const configString = unziped[configName];

                if (configString == null) {
                    fileInput.innerHTML = `Error: ${configName} not found`;
                    throw new Error(`Cannot find ${configName} ${unziped}`);
                }

                const configFile = JSON.parse(configString);

                this.config = {
                    fileMap: unziped,
                    modules: configFile.modules
                };

                this.panelElements.modules.element.innerHTML = ""

                this.runScripts()
            }


        });


        fileInput.addEventListener("dragenter", (event: DragEvent) => {
            event.preventDefault()
            fileInput.classList.add(`${panelName}-hover-over`)
        });

        fileInput.addEventListener("dragleave", (event: DragEvent) => {
            event.preventDefault()
            fileInput.classList.remove(`${panelName}-hover-over`)
        });

        fileInput.addEventListener("dragover", (event: DragEvent) => {
            event.preventDefault()
        });
    }

    private createElements() {

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

        this.panelElements = {
            rootElement: rootElement,
            topBar: topBar as HTMLDivElement,
            modules: modules,
            closeButton: closeButton as HTMLButtonElement,
            minimizeButton: minimizeButton as HTMLButtonElement,
        }

        this.registerEvents()
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
