import { PanelModule } from "./PanelModule"

type ConfigSchema = {
    version: string,
    hideKey: string,
    onLoadLog?: boolean,
    modules: {[webPath: string]: PanelModule[]} | [RegExp | string, PanelModule[]][]
}

export {
    ConfigSchema
}