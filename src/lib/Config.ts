import { PanelModule } from "./module"

type ConfigSchema = {
    version: string,
    hideKey: string,
    modules: {[webPath: string]: PanelModule[]}
}

export {
    ConfigSchema
}