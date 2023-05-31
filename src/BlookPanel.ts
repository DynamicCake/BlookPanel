import { BlookPanelModuleList } from "./BlookPanelModuleList";
import { StateChangeEvent } from "./StateChangeEvent";
import { ApplicationHook, BlookPanelWindow } from "./lib/ApplicationHook";
import { BlooketHook } from "./BlooketHook";
import { PanelModuleList } from "./lib/PanelItems";
import { Panel } from "./lib/Panel";
import JSZip, { file } from "jszip";
import { Config } from "./lib/Config";

export class BlookPanel implements Panel {
    rootElement!: HTMLDivElement;
    topBar!: HTMLDivElement;
    modules!: PanelModuleList;
    closeButton!: HTMLButtonElement;
    minimizeButton!: HTMLButtonElement;
    stateChangeEvent!: StateChangeEvent;
    config!: Config

    readonly blooketWindow: BlookPanelWindow;
    readonly applicationHook: ApplicationHook;
    readonly panelName: string;


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
    }

    cleanUp(rootElement: HTMLElement, reactHandler: Function, window: BlookPanelWindow) {
        rootElement.remove();
        this.applicationHook.unhookSetState(reactHandler);
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

        this.modules.element.innerHTML = `
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

            reader.onload = (e) => {
                const fileData = e.target!.result;

                const decoder = new TextDecoder('utf-8');

                zip.loadAsync(fileData!)
                    .then((zipData) => {
                        let count = 0;
                        let max = 0;
                        zipData.forEach((relativePath: string, zipEntry) => {
                            if (!zipEntry.dir) {
                                max++
                                zipEntry.async('uint8array')
                                    .then((fileContent) => {
                                        unziped[relativePath] = decoder.decode(fileContent);
                                        count++;
                                    })
                                    .catch((error) => {
                                        fileInput.innerText = "Error: Cannot extract zip file";
                                        throw new Error(`Error extracting file: ${error}`);
                                    });
                            }
                        });

                        const date = Date.now() + 10_000;
                        const interval = setInterval(function() {
                            if (date < Date.now()) {
                                clearInterval(interval);
                                throw new Error(`Could not complete unziping (${count}/${max}`);
                            }
                            if (count <= max) {
                                loadConfig();
                                clearInterval(interval);
                            }
                        }, 10);

                    })
                    .catch((error) => {
                        fileInput.innerText = "Error: Cannot load zip file";
                        throw new Error(`Error loading ZIP file: ${error}`);
                    });
            };
            reader.readAsArrayBuffer(file);

            let panel = this;
            function loadConfig() {

                const configName = "config.json";
                const configString = unziped[configName];

                if (configString == null) {
                    fileInput.innerHTML = `Error: ${configName} not found`;
                    throw new Error(`Cannot find ${configName} ${unziped}`);
                }

                const configFile = JSON.parse(configString);

                panel.config = {
                    fileMap: unziped,
                    modules: configFile
                };

                panel.modules.element.innerHTML = ""

            }

        });


        fileInput.addEventListener("dragenter", (event: DragEvent) => {
            event.preventDefault()
            fileInput.classList.add(`${panelName}-hover-over`)
        });

        fileInput.addEventListener("dragleave", (event: DragEvent) => {
            event.preventDefault()
            fileInput.classList.remove(`${panelName}-hover-over`)
        })

        fileInput.addEventListener("dragover", (event: DragEvent) => {
            event.preventDefault()
        })
    }

    private createElements() {

        const panelName = this.panelName;

        this.rootElement = document.createElement("div");
        this.rootElement.id = this.panelName;

        this.rootElement.innerHTML = `
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

        document.body.append(this.rootElement);

        this.topBar = document.querySelector(`#${panelName} .${panelName}-top-bar`)!;
        this.modules = new BlookPanelModuleList(
            this,
            document.querySelector(`#${panelName} .${panelName}-modules`)!
        )


        this.closeButton = document.querySelector(`#${panelName} .${panelName}-top-bar .${panelName}-close`)!;
        this.closeButton.innerHTML = "x";
        this.minimizeButton = document.querySelector(`#${panelName} .${panelName}-top-bar .${panelName}-minimize`)!;
        this.minimizeButton.innerHTML = "-";

        this.registerEvents()
    }

    private registerEvents() {
        this.makeDraggable(this.rootElement, this.topBar);

        this.closeButton.addEventListener('click', () => {
            this.cleanUp(this.rootElement, this.getReactHandler, this.blooketWindow);
        });


        // this.rootElement.addEventListener("dragstart", (event) => {console.log("dragstart")})
        // this.rootElement.addEventListener("dragend", (event) => {console.log("dragend")})
        // this.rootElement.addEventListener("dragenter", (event) => {console.log("dragend")})
        // this.rootElement.addEventListener("dragleave", (event) => {console.log("dragleave")})
    }

    private hook() {
        this.stateChangeEvent = new StateChangeEvent();

        this.applicationHook.hookSetState(this.getReactHandler, this.stateChangeEvent);
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

