import { makeDraggable, injectPanelHtml } from './init_page'
import './style.scss'

const panelId = "blook-panel";


injectPanelHtml(panelId, "Blook Panel");

let mainPanel = document.getElementById(panelId);
let panelHeader = document.getElementById(`${panelId}-header`);
let panelItems = document.getElementById(`${panelId}-items`)

console.log(mainPanel, panelHeader, panelItems)

makeDraggable(mainPanel, panelHeader);

