/**
 * The gateway to blooket hacking, gets a lot of the data (ex. state)
 * @returns {object} The handler to access everything like `stateNode`
 */
function getReactHandler() { 
    return Object.values(document.querySelector('#app > div > div'))[1].children[1]._owner; 
}

export {
    getReactHandler
}