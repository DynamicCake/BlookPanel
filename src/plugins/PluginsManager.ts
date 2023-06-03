import { ConfigSchema } from '../lib/Config'
import AllCorrect from './AllCorrect'
import OpChests from './gold_quest/OpChests'

const Config: ConfigSchema = {
    modules: {
        "/play/gold": [
            new OpChests(),
            new AllCorrect()
        ]
    }
}
export {
    Config 
}
