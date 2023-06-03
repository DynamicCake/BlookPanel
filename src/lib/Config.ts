import { PanelModule } from "./module"

type ConfigSchema = {
    modules: {[webPath: string]: PanelModule[]}
}

export {
    ConfigSchema
}