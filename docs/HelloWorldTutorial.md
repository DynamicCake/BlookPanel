# Before we start...
This tutorial assumes that you have knowledge of TypeScript. 

# How to get started
This project uses NodeJS which can be downloaded [here](https://nodejs.org/).
Once you installed NodeJs, make a branch on GitHub or download the project as a zip and unzip it.
Then, run the command `npm install` in the project to install all the dependencies.

# Create your first module
Files:
- [HelloWorldModule.ts](../src/modules/HelloWorldModule.ts)
- [PluginManager.ts](../src/modules/ModuleManager.ts)


To make a module, make a new file and name it after the module name. Then make a class (Preferably the same as the file name) that extends `PanelModule`.

```ts
class HelloWorldModule implements PanelModule {

}
```
Your IDE will probably complain that you implemented your module incorrectly. Autocomplete it so it becomes something this.
```ts
class HelloWorldModule implements PanelModule {

    id: string; // Error not initialized

    onInit(panel: Panel, element: HTMLDivElement): void {
        // Some runtime error message
    }

    onShutdown(): void {
        // Some runtime error message
    }
}
```
Add the module id, as of version 1.0 it isn't used much anything than to broadcast it to the console that the module has been loaded.
```ts
class HelloWorldModule implements PanelModule {

    id: string = "HelloWorld"; 

    onInit(panel: Panel, element: HTMLDivElement): void {
    }

    onShutdown(): void {
    }
}
```
Here we will add an element to show that the module has been loaded and display a "Hello World" message
```ts
onInit(panel: Panel, element: HTMLDivElement): void {
    const p = document.createElement("p");
    p.innerText = `Hello World!`;
    // Add to the assigned section
    element.append(p);
}
```
This will make the modules div look like this
```html
<div class="blook-panel-modules">
    <div> <!-- Created for this module, can be gotten from the second parameter in the onInit function -->
        <p>
            Hello World!
        </p>
    </div>
</div>

```
We will then subscribe to the `StateChange` event by subscribing using a string. Then we pass in a `Subscriber` object which has a callback and a priority. 
For the callback, we receive the `EventData`, log it to the console and then return it. And for the priority, we put `MONITOR` because we are viewing it and not modifying it.
We also save the subscriber id and panel so we can unsubscribe from the event once we are done.
```ts
class HelloWorldModule implements PanelModule {
    id: string = "HelloWorld"; 
    panel!: Panel;
    subscriberId!: number;

    onInit(panel: Panel, element: HTMLDivElement): void {
        const p = document.createElement("p");
        p.innerText = `Hello World!`;
        // Add to the assigned section
        element.append(p);

        this.panel = panel;
        this.subscriberId = panel.stateChangeEvent.subscribe("HelloWorld", {
            callback: (data: EventData): EventData => {
                console.log("Hello StateChangeEvent", data);
                return data;
            },
            priority: EventPriority.MONITOR // We set it to monitor because we are not changing the event data
        });
    }
    onShutdown(): void {
        this.panel.stateChangeEvent.unsubscribeWithId(this.subscriberId);
    }

}

export = HelloWorldModule;
```
Then, we export and register this module in `ModuleManager.ts` 
```ts
const Config: ConfigSchema = {
    version: "1.1",
    hideKey: "Escape",
    modules: {
        "/play/lobby": [ // Will only work in the lobby
            new HelloWorldModule() // Initialize our module
        ]
    },
    // OR
    modules: [
        [
            /^\/play/, [ // Will work in every game
                new HelloWorldModule(),
            ]
        ],
    ]
}

export {
    Config
}
```
And now build the project using `npm run build` and copy paste `out/panel.js`'s contents.

Congratulations, now when a state change event happens in the lobby, hello world gets printed out.