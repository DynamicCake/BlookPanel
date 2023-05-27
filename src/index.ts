import './style.scss'
import { makeDraggable, injectPanelHtml, shutDown } from './init_page'
import { hookSetState, getReactHandler, isHooked } from './lib/hook'
import { StateChangeEvent, EventData } from './lib/state_change_event'

if (isHooked(getReactHandler)) {
    alert("Panel already injected! Aborting...")
    throw new Error("Panel already injected")
}

const panelId = "blook-panel";

injectPanelHtml(panelId, "Blook Panel");

let mainPanel = document.getElementById(panelId)!;
let panelHeader = document.getElementById(`${panelId}-header`)!;
let panelItems = document.getElementById(`${panelId}-items`)!;

makeDraggable(mainPanel, panelHeader);

let stateChangeEvent = new StateChangeEvent();
hookSetState(getReactHandler, stateChangeEvent);

stateChangeEvent.subscribe("test", function (data: EventData) {
    console.log(data);
});

panelItems.innerHTML = `
<p>loaded!<p>
<button id="${panelId}-close">close</button>
`

let closeButton = document.getElementById(`${panelId}-close`)!;

closeButton.addEventListener('click', function () {
    shutDown(mainPanel, getReactHandler);
})


getReactHandler().stateNode.setState({ panelInjected: true })