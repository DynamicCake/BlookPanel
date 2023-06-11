import { FunctionCallEvent } from "./StateChangeEvent";
import { StateChangeEventData } from "./StateChangeEventData";
import { ApplicationHook } from "./lib/ApplicationHook";
import { AbstractFunctionCallEvent } from "./lib/BlooketEvent";
import { Panel } from "./lib/Panel";

class BlooketHook implements ApplicationHook {

    events: { [path: string]: AbstractFunctionCallEvent; };
    panel: Panel
    
    constructor(panel: Panel) {
        this.panel = panel;
        this.events = {};
    }

    getEvent(path: string): AbstractFunctionCallEvent {
        if (path in this.events) {
            return this.events[path];
        } else {
            let func: Function = accessWithPath(this.panel.getReactHandler(), path);
            if (func === undefined) {
                throw new TypeError(`Cannot find function in path ${path}`)
            }

            if (typeof func !== "function") {
                throw new TypeError(`Property with path ${path} is not type function`)
            }
            
            const event = new FunctionCallEvent(func);
            setWithPath(this.panel.getReactHandler(), path, BlooketHook.patch(event, func)); 
            this.events[path] = event;

            return event;
        }
    }

    private static patch(event: FunctionCallEvent, oldFunction: Function): Function {
        const func = function(this: unknown) {
            const result = event.emit(
                new StateChangeEventData(
                    arguments,
                    Date.now()
                )
            );
            
            if (!result.isCanceled)
                oldFunction.apply(this, result.arguments);
        }
        return func;
    }

    cleanUp(): void {
        for (let i in this.events) {
            const event = this.events[i];
            setWithPath(this.panel.getReactHandler(), i, event.originalFunction); 
        }
    }
}

function accessWithPath(obj: {[key: string]: any}, path: string): any {
    const accesses = path.split(".");

    let currentObj = obj;
    for (let access of accesses) {
        currentObj = currentObj[access]
        if (currentObj == undefined) return undefined;
    }
    return currentObj;
}

// TODO Find a way to make it be able to mutate without having to do this bullshit
function setWithPath(obj: {[key: string]: any}, path: string, thingToSet: any): void {
    const allAccesses = path.split(".");
    const accesses = allAccesses.slice(0, 1);
    let currentObj = obj;
    for (let access of accesses) {
        currentObj = currentObj[access]
        if (currentObj == undefined) return undefined;
    }

    currentObj[
        allAccesses[allAccesses.length - 1]
    ] = thingToSet;
}

export {
    BlooketHook
}