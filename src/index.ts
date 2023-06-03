import { BlookPanel } from "./BlookPanel";

const github = "https://github.com/DynamicCake/BlookPanel";
try {
    new BlookPanel("blook-panel");
} catch (ex) {
    console.log(`%c⚠️ An error has occurred, please report this as an issue at ${github}`, "font-size:large; color: red; text-shadow: 0.1rem 0.1rem 0 #000;");
    console.error(ex);
} 


