/**
 * Injects the panel's html
 * @param {string} panelName the id that the panel will use
 * @param {string} headerMessage panel header's display text
 */
function injectPanelHtml(panelName, headerMessage) {

    let container = document.createElement("div");
    container.innerHTML = `
    <div id="${panelName}-header">${headerMessage}</div>
    <div id="${panelName}-items">
        <p>Loading...</p>
    </div>
`
    container.id = panelName

    document.body.append(container)
}

/**
 * Makes the `mainDiv` draggable using `headerDiv`
 * @param {HTMLElement!} mainDiv
 * @param {HTMLElement!} headerDiv
*/
function makeDraggable(mainDiv, headerDiv) {

    let offsetX, offsetY;
    let viewportWidth, viewportHeight;

    headerDiv.addEventListener('mousedown', function (e) {
        // Calculate the offset between the mouse position and the top-left corner of the draggable div
        offsetX = e.clientX - mainDiv.offsetLeft;
        offsetY = e.clientY - mainDiv.offsetTop;

        // Get the viewport dimensions
        viewportWidth = window.innerWidth || document.documentElement.clientWidth;
        viewportHeight = window.innerHeight || document.documentElement.clientHeight;

        // Attach the mousemove and mouseup event listeners
        document.addEventListener('mousemove', handleDrag);
        document.addEventListener('mouseup', handleDragEnd);
    });

    function handleDrag(e) {
        // Calculate the new position of the draggable div
        var newLeft = e.clientX - offsetX;
        var newTop = e.clientY - offsetY;

        // Restrict the movement within the viewport boundaries
        newLeft = Math.max(0, Math.min(newLeft, viewportWidth - mainDiv.offsetWidth));
        newTop = Math.max(0, Math.min(newTop, viewportHeight - mainDiv.offsetHeight));

        // Update the position of the draggable div
        mainDiv.style.left = newLeft + 'px';
        mainDiv.style.top = newTop + 'px';
    }

    function handleDragEnd() {
        // Remove the mousemove and mouseup event listeners
        document.removeEventListener('mousemove', handleDrag);
        document.removeEventListener('mouseup', handleDragEnd);
    }
}

export {
    makeDraggable,
    injectPanelHtml,
}