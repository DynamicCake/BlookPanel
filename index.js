import { makeDraggable, injectPanelHtml, injectCss } from './init_page.js'

const panelId = "blook-panel";


injectPanelHtml(panelId, "Blook Panel");
injectCss("./style.css");

let mainPanel = document.getElementById(panelId);
let panelHeader = document.getElementById(`${panelId}-header`);
let panelItems = document.getElementById(`${panelId}-items`)

console.log(mainPanel, panelHeader, panelItems)

makeDraggable(mainPanel, panelHeader);

