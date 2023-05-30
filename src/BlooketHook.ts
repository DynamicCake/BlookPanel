import { StateChangeEventData } from "./StateChangeEventData";
import { StateChangeEvent } from "./StateChangeEvent";
import { ApplicationHook } from "./lib/ApplicationHook";

class BlooketHook implements ApplicationHook {

    setStateFunction!: Function;

    /**
     * Hooks into the `setState` function to be able to make events
     * @param reactHandler game's react handler
     * @throws if the `setState` function is already hooked
     */
    hookSetState(reactHandler: Function, stateChangeEvent: StateChangeEvent) {
        if (this.setStateFunction !== undefined) {
            throw new Error("setState function is already hooked");
        }
        let oldSetState: Function = reactHandler().stateNode.setState;
        this.setStateFunction = oldSetState;
        reactHandler().stateNode.setState = function () {

            let result = stateChangeEvent.emit(
                new StateChangeEventData(
                    reactHandler().stateNode.state,
                    arguments,
                    Date.now()
                )
            );

            if (!result.isCanceled)
                oldSetState.call(this, ...result.arguements);

        };
    }

    /**
     * Unhooks the `setState` function's event
     * @param reactHandler the handler to remove the hook from
     * @throws if the `setState` function isn't hooked
     */
    unhookSetState(reactHandler: Function) {
        if (this.setStateFunction === undefined) {
            throw new Error("setState function is not hooked");
        }
        reactHandler().stateNode.setState = this.setStateFunction;
    }

    isHooked(reactHandler: Function): boolean {
        return reactHandler().stateNode.setState != this.setStateFunction;
    }
}

export {
    BlooketHook
}