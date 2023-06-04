import { PanelModule } from "./module"

type ConfigSchema = {
    hideKey: string,
    modules: {[webPath: string]: PanelModule[]}
}

export {
    ConfigSchema
}