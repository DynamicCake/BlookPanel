import { ConfigSchema } from '../lib/Config'
import HelloWorldModule from './HelloWorldModule'
import AllCorrect from './general/AllCorrect'
import OpChests from './gold_quest/OpChests'
import SetGold from './gold_quest/SetGold'
import UnlockAll from './lobby/UnlockAll'

/**
 * The config file that gets loaded by the loader 
 */
const Config: ConfigSchema = {
    version: "1.0",
    hideKey: "Escape",
    modules: {
        "/play": [
            new HelloWorldModule() // Initialize our module
        ],
        "/play/gold": [
            new AllCorrect(),
            new OpChests(),
            new SetGold()
        ],
        "/play/lobby": [
            new UnlockAll()
        ],
    }
}
export {
    Config 
}
