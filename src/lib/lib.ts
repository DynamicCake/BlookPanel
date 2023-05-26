import { StateChangeEvent } from "./state_change_event";

/**
 * The gateway to blooket hacking, gets a lot of the data (ex. state)
 * @returns {DynamicObject} The handler to access everything like `stateNode`
 */
function getReactHandler(): Record<string, any> {
    return Object.values(document.querySelector('#app > div > div')!)[1].children[1]._owner;
}

/**
 * Hooks into the setState function to be able to make events
 * @param reactHandler game's react handler
 */
function hookSetState(reactHandler: Function, stateChangeEvent: StateChangeEvent) {
    let oldSetState = reactHandler().stateNode.setState
    reactHandler().stateNode.setState = function () {

        let before = reactHandler().stateNode.state;
        oldSetState.call(this, ...arguments)
        stateChangeEvent.emit({
            before: before,
            after: reactHandler().stateNode.state,
            time: Date.now()
        })

    }
}

type DynamicObject = Record<string, any> 

export {
    getReactHandler,
    hookSetState,
    DynamicObject
}