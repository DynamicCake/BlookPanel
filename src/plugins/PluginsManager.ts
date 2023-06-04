import { ConfigSchema } from '../lib/Config'
import AllCorrect from './general/AllCorrect'
import OpChests from './gold_quest/OpChests'
import SetGold from './gold_quest/SetGold'
import UnlockAll from './lobby/UnlockAll'

const Config: ConfigSchema = {
    hideKey: "Escape",
    modules: {
        "/play/gold": [
            new AllCorrect(),
            new OpChests(),
            new SetGold()
        ],
        "/play/lobby": [
            new UnlockAll()
        ]
    }
}
export {
    Config 
}
