import { StateChangeEvent } from "./state_change_event";

/**
 * The gateway to blooket hacking, gets a lot of the data (ex. state)
 * @returns {DynamicObject} The handler to access everything like `stateNode`
 */
function getReactHandler(): Record<string, any> {
    return Object.values(document.querySelector('#app > div > div')!)[1].children[1]._owner;
}

let setStateFunction: Function;

/**
 * Hooks into the `setState` function to be able to make events
 * @param reactHandler game's react handler
 * @throws if the `setState` function is already hooked
 */
function hookSetState(reactHandler: Function, stateChangeEvent: StateChangeEvent) {
    if (setStateFunction !== undefined) {
        throw new Error("setState function is already hooked")
    }
    let oldSetState = reactHandler().stateNode.setState
    setStateFunction = oldSetState
    reactHandler().stateNode.setState = function() {

        let beforeState = reactHandler().stateNode.state;
        console.log(beforeState)
        oldSetState.call(this, ...arguments)
        stateChangeEvent.emit({
            before: beforeState,
            after: reactHandler().stateNode.state,
            time: Date.now()
        })
    }
}

/**
 * Unhooks the `setState` function's event
 * @param reactHandler the handler to remove the hook from
 * @throws if the `setState` function isn't hooked
 */
function unhookSetState(reactHandler: Function) {
    if (setStateFunction === undefined) {
        throw new Error("setState function is not hooked");
    }
    reactHandler().stateNode.setState = setStateFunction;
}

function isHooked(): boolean {
    return setStateFunction !== undefined
}

type DynamicObject = Record<string, any> 

export {
    getReactHandler,
    hookSetState,
    unhookSetState,
    isHooked,
    DynamicObject,
}