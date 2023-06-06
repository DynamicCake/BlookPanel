import { StateChangeEventData } from "./StateChangeEventData";
import { StateChangeEvent } from "./StateChangeEvent";
import { ApplicationHook } from "./lib/ApplicationHook";

class BlooketHook implements ApplicationHook {


    setStateFunction!: Function;

    hookOriginalSetState(reactHandler: Function): void {
        reactHandler().stateNode.originalSetState = this.setStateFunction;
    }

    hookSetState(reactHandler: Function, stateChangeEvent: StateChangeEvent) {
        if (this.isHooked(reactHandler)) {
            throw new Error("setState function is already hooked");
        }
        let oldSetState: Function = reactHandler().stateNode.setState;
        this.setStateFunction = oldSetState;
        reactHandler().stateNode.setState = function () {

            const result = stateChangeEvent.emit(
                new StateChangeEventData(
                    reactHandler().stateNode.state,
                    arguments,
                    Date.now()
                )
            );

            if (!result.isCanceled)
                oldSetState.apply(this, result.arguments);

        };
    }

    unhookSetState(reactHandler: Function) {
        if (this.setStateFunction === undefined) {
            throw new Error("setState function is not hooked");
        }
        reactHandler().stateNode.setState = this.setStateFunction;
    }

    isHooked(reactHandler: Function): boolean {
        const originalSetState = reactHandler().stateNode.setState
        return originalSetState !== this.setStateFunction && this.setStateFunction !== undefined;

    }
}

export {
    BlooketHook
}