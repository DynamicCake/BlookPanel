/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./node_modules/css-loader/dist/cjs.js!./node_modules/sass-loader/dist/cjs.js!./src/style.scss":
/*!*****************************************************************************************************!*\
  !*** ./node_modules/css-loader/dist/cjs.js!./node_modules/sass-loader/dist/cjs.js!./src/style.scss ***!
  \*****************************************************************************************************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var _node_modules_css_loader_dist_runtime_noSourceMaps_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../node_modules/css-loader/dist/runtime/noSourceMaps.js */ \"./node_modules/css-loader/dist/runtime/noSourceMaps.js\");\n/* harmony import */ var _node_modules_css_loader_dist_runtime_noSourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_noSourceMaps_js__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../node_modules/css-loader/dist/runtime/api.js */ \"./node_modules/css-loader/dist/runtime/api.js\");\n/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__);\n// Imports\n\n\nvar ___CSS_LOADER_EXPORT___ = _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default()((_node_modules_css_loader_dist_runtime_noSourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default()));\n___CSS_LOADER_EXPORT___.push([module.id, \"@import url(https://fonts.googleapis.com/css2?family=Roboto&display=swap);\"]);\n// Module\n___CSS_LOADER_EXPORT___.push([module.id, \"#blook-panel {\\n  position: absolute;\\n  background-color: #E6E6FA;\\n  border: 1px solid #ccc;\\n  font-family: \\\"Roboto\\\", sans-serif;\\n  user-select: none;\\n  white-space: nowrap;\\n  resize: both;\\n  overflow: hidden;\\n}\\n#blook-panel .blook-panel-items {\\n  padding: 10px;\\n  background-color: white;\\n  margin: 10px;\\n}\\n#blook-panel .blook-panel-top-bar {\\n  cursor: move;\\n  background-color: #ccc;\\n  display: flex;\\n  flex-direction: row;\\n  padding: 10px;\\n  align-items: center;\\n  justify-content: space-between;\\n}\\n#blook-panel .blook-panel-top-bar .blook-panel-text {\\n  font-size: larger;\\n  order: 1;\\n}\\n#blook-panel .blook-panel-top-bar .blook-panel-images {\\n  order: 2;\\n}\\n#blook-panel .blook-panel-top-bar img {\\n  margin-left: 10px;\\n  user-select: none;\\n}\", \"\"]);\n// Exports\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (___CSS_LOADER_EXPORT___);\n\n\n//# sourceURL=webpack://blookpanel/./src/style.scss?./node_modules/css-loader/dist/cjs.js!./node_modules/sass-loader/dist/cjs.js");

/***/ }),

/***/ "./node_modules/css-loader/dist/runtime/api.js":
/*!*****************************************************!*\
  !*** ./node_modules/css-loader/dist/runtime/api.js ***!
  \*****************************************************/
/***/ ((module) => {

eval("\n\n/*\n  MIT License http://www.opensource.org/licenses/mit-license.php\n  Author Tobias Koppers @sokra\n*/\nmodule.exports = function (cssWithMappingToString) {\n  var list = [];\n\n  // return the list of modules as css string\n  list.toString = function toString() {\n    return this.map(function (item) {\n      var content = \"\";\n      var needLayer = typeof item[5] !== \"undefined\";\n      if (item[4]) {\n        content += \"@supports (\".concat(item[4], \") {\");\n      }\n      if (item[2]) {\n        content += \"@media \".concat(item[2], \" {\");\n      }\n      if (needLayer) {\n        content += \"@layer\".concat(item[5].length > 0 ? \" \".concat(item[5]) : \"\", \" {\");\n      }\n      content += cssWithMappingToString(item);\n      if (needLayer) {\n        content += \"}\";\n      }\n      if (item[2]) {\n        content += \"}\";\n      }\n      if (item[4]) {\n        content += \"}\";\n      }\n      return content;\n    }).join(\"\");\n  };\n\n  // import a list of modules into the list\n  list.i = function i(modules, media, dedupe, supports, layer) {\n    if (typeof modules === \"string\") {\n      modules = [[null, modules, undefined]];\n    }\n    var alreadyImportedModules = {};\n    if (dedupe) {\n      for (var k = 0; k < this.length; k++) {\n        var id = this[k][0];\n        if (id != null) {\n          alreadyImportedModules[id] = true;\n        }\n      }\n    }\n    for (var _k = 0; _k < modules.length; _k++) {\n      var item = [].concat(modules[_k]);\n      if (dedupe && alreadyImportedModules[item[0]]) {\n        continue;\n      }\n      if (typeof layer !== \"undefined\") {\n        if (typeof item[5] === \"undefined\") {\n          item[5] = layer;\n        } else {\n          item[1] = \"@layer\".concat(item[5].length > 0 ? \" \".concat(item[5]) : \"\", \" {\").concat(item[1], \"}\");\n          item[5] = layer;\n        }\n      }\n      if (media) {\n        if (!item[2]) {\n          item[2] = media;\n        } else {\n          item[1] = \"@media \".concat(item[2], \" {\").concat(item[1], \"}\");\n          item[2] = media;\n        }\n      }\n      if (supports) {\n        if (!item[4]) {\n          item[4] = \"\".concat(supports);\n        } else {\n          item[1] = \"@supports (\".concat(item[4], \") {\").concat(item[1], \"}\");\n          item[4] = supports;\n        }\n      }\n      list.push(item);\n    }\n  };\n  return list;\n};\n\n//# sourceURL=webpack://blookpanel/./node_modules/css-loader/dist/runtime/api.js?");

/***/ }),

/***/ "./node_modules/css-loader/dist/runtime/noSourceMaps.js":
/*!**************************************************************!*\
  !*** ./node_modules/css-loader/dist/runtime/noSourceMaps.js ***!
  \**************************************************************/
/***/ ((module) => {

eval("\n\nmodule.exports = function (i) {\n  return i[1];\n};\n\n//# sourceURL=webpack://blookpanel/./node_modules/css-loader/dist/runtime/noSourceMaps.js?");

/***/ }),

/***/ "./src/style.scss":
/*!************************!*\
  !*** ./src/style.scss ***!
  \************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! !../node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js */ \"./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js\");\n/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var _node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! !../node_modules/style-loader/dist/runtime/styleDomAPI.js */ \"./node_modules/style-loader/dist/runtime/styleDomAPI.js\");\n/* harmony import */ var _node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var _node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! !../node_modules/style-loader/dist/runtime/insertBySelector.js */ \"./node_modules/style-loader/dist/runtime/insertBySelector.js\");\n/* harmony import */ var _node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2__);\n/* harmony import */ var _node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! !../node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js */ \"./node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js\");\n/* harmony import */ var _node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3__);\n/* harmony import */ var _node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! !../node_modules/style-loader/dist/runtime/insertStyleElement.js */ \"./node_modules/style-loader/dist/runtime/insertStyleElement.js\");\n/* harmony import */ var _node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4__);\n/* harmony import */ var _node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! !../node_modules/style-loader/dist/runtime/styleTagTransform.js */ \"./node_modules/style-loader/dist/runtime/styleTagTransform.js\");\n/* harmony import */ var _node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5__);\n/* harmony import */ var _node_modules_css_loader_dist_cjs_js_node_modules_sass_loader_dist_cjs_js_style_scss__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! !!../node_modules/css-loader/dist/cjs.js!../node_modules/sass-loader/dist/cjs.js!./style.scss */ \"./node_modules/css-loader/dist/cjs.js!./node_modules/sass-loader/dist/cjs.js!./src/style.scss\");\n\n      \n      \n      \n      \n      \n      \n      \n      \n      \n\nvar options = {};\n\noptions.styleTagTransform = (_node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5___default());\noptions.setAttributes = (_node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3___default());\n\n      options.insert = _node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2___default().bind(null, \"head\");\n    \noptions.domAPI = (_node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1___default());\noptions.insertStyleElement = (_node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4___default());\n\nvar update = _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default()(_node_modules_css_loader_dist_cjs_js_node_modules_sass_loader_dist_cjs_js_style_scss__WEBPACK_IMPORTED_MODULE_6__[\"default\"], options);\n\n\n\n\n       /* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_node_modules_css_loader_dist_cjs_js_node_modules_sass_loader_dist_cjs_js_style_scss__WEBPACK_IMPORTED_MODULE_6__[\"default\"] && _node_modules_css_loader_dist_cjs_js_node_modules_sass_loader_dist_cjs_js_style_scss__WEBPACK_IMPORTED_MODULE_6__[\"default\"].locals ? _node_modules_css_loader_dist_cjs_js_node_modules_sass_loader_dist_cjs_js_style_scss__WEBPACK_IMPORTED_MODULE_6__[\"default\"].locals : undefined);\n\n\n//# sourceURL=webpack://blookpanel/./src/style.scss?");

/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js":
/*!****************************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js ***!
  \****************************************************************************/
/***/ ((module) => {

eval("\n\nvar stylesInDOM = [];\nfunction getIndexByIdentifier(identifier) {\n  var result = -1;\n  for (var i = 0; i < stylesInDOM.length; i++) {\n    if (stylesInDOM[i].identifier === identifier) {\n      result = i;\n      break;\n    }\n  }\n  return result;\n}\nfunction modulesToDom(list, options) {\n  var idCountMap = {};\n  var identifiers = [];\n  for (var i = 0; i < list.length; i++) {\n    var item = list[i];\n    var id = options.base ? item[0] + options.base : item[0];\n    var count = idCountMap[id] || 0;\n    var identifier = \"\".concat(id, \" \").concat(count);\n    idCountMap[id] = count + 1;\n    var indexByIdentifier = getIndexByIdentifier(identifier);\n    var obj = {\n      css: item[1],\n      media: item[2],\n      sourceMap: item[3],\n      supports: item[4],\n      layer: item[5]\n    };\n    if (indexByIdentifier !== -1) {\n      stylesInDOM[indexByIdentifier].references++;\n      stylesInDOM[indexByIdentifier].updater(obj);\n    } else {\n      var updater = addElementStyle(obj, options);\n      options.byIndex = i;\n      stylesInDOM.splice(i, 0, {\n        identifier: identifier,\n        updater: updater,\n        references: 1\n      });\n    }\n    identifiers.push(identifier);\n  }\n  return identifiers;\n}\nfunction addElementStyle(obj, options) {\n  var api = options.domAPI(options);\n  api.update(obj);\n  var updater = function updater(newObj) {\n    if (newObj) {\n      if (newObj.css === obj.css && newObj.media === obj.media && newObj.sourceMap === obj.sourceMap && newObj.supports === obj.supports && newObj.layer === obj.layer) {\n        return;\n      }\n      api.update(obj = newObj);\n    } else {\n      api.remove();\n    }\n  };\n  return updater;\n}\nmodule.exports = function (list, options) {\n  options = options || {};\n  list = list || [];\n  var lastIdentifiers = modulesToDom(list, options);\n  return function update(newList) {\n    newList = newList || [];\n    for (var i = 0; i < lastIdentifiers.length; i++) {\n      var identifier = lastIdentifiers[i];\n      var index = getIndexByIdentifier(identifier);\n      stylesInDOM[index].references--;\n    }\n    var newLastIdentifiers = modulesToDom(newList, options);\n    for (var _i = 0; _i < lastIdentifiers.length; _i++) {\n      var _identifier = lastIdentifiers[_i];\n      var _index = getIndexByIdentifier(_identifier);\n      if (stylesInDOM[_index].references === 0) {\n        stylesInDOM[_index].updater();\n        stylesInDOM.splice(_index, 1);\n      }\n    }\n    lastIdentifiers = newLastIdentifiers;\n  };\n};\n\n//# sourceURL=webpack://blookpanel/./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js?");

/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/insertBySelector.js":
/*!********************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/insertBySelector.js ***!
  \********************************************************************/
/***/ ((module) => {

eval("\n\nvar memo = {};\n\n/* istanbul ignore next  */\nfunction getTarget(target) {\n  if (typeof memo[target] === \"undefined\") {\n    var styleTarget = document.querySelector(target);\n\n    // Special case to return head of iframe instead of iframe itself\n    if (window.HTMLIFrameElement && styleTarget instanceof window.HTMLIFrameElement) {\n      try {\n        // This will throw an exception if access to iframe is blocked\n        // due to cross-origin restrictions\n        styleTarget = styleTarget.contentDocument.head;\n      } catch (e) {\n        // istanbul ignore next\n        styleTarget = null;\n      }\n    }\n    memo[target] = styleTarget;\n  }\n  return memo[target];\n}\n\n/* istanbul ignore next  */\nfunction insertBySelector(insert, style) {\n  var target = getTarget(insert);\n  if (!target) {\n    throw new Error(\"Couldn't find a style target. This probably means that the value for the 'insert' parameter is invalid.\");\n  }\n  target.appendChild(style);\n}\nmodule.exports = insertBySelector;\n\n//# sourceURL=webpack://blookpanel/./node_modules/style-loader/dist/runtime/insertBySelector.js?");

/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/insertStyleElement.js":
/*!**********************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/insertStyleElement.js ***!
  \**********************************************************************/
/***/ ((module) => {

eval("\n\n/* istanbul ignore next  */\nfunction insertStyleElement(options) {\n  var element = document.createElement(\"style\");\n  options.setAttributes(element, options.attributes);\n  options.insert(element, options.options);\n  return element;\n}\nmodule.exports = insertStyleElement;\n\n//# sourceURL=webpack://blookpanel/./node_modules/style-loader/dist/runtime/insertStyleElement.js?");

/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js":
/*!**********************************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js ***!
  \**********************************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

eval("\n\n/* istanbul ignore next  */\nfunction setAttributesWithoutAttributes(styleElement) {\n  var nonce =  true ? __webpack_require__.nc : 0;\n  if (nonce) {\n    styleElement.setAttribute(\"nonce\", nonce);\n  }\n}\nmodule.exports = setAttributesWithoutAttributes;\n\n//# sourceURL=webpack://blookpanel/./node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js?");

/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/styleDomAPI.js":
/*!***************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/styleDomAPI.js ***!
  \***************************************************************/
/***/ ((module) => {

eval("\n\n/* istanbul ignore next  */\nfunction apply(styleElement, options, obj) {\n  var css = \"\";\n  if (obj.supports) {\n    css += \"@supports (\".concat(obj.supports, \") {\");\n  }\n  if (obj.media) {\n    css += \"@media \".concat(obj.media, \" {\");\n  }\n  var needLayer = typeof obj.layer !== \"undefined\";\n  if (needLayer) {\n    css += \"@layer\".concat(obj.layer.length > 0 ? \" \".concat(obj.layer) : \"\", \" {\");\n  }\n  css += obj.css;\n  if (needLayer) {\n    css += \"}\";\n  }\n  if (obj.media) {\n    css += \"}\";\n  }\n  if (obj.supports) {\n    css += \"}\";\n  }\n  var sourceMap = obj.sourceMap;\n  if (sourceMap && typeof btoa !== \"undefined\") {\n    css += \"\\n/*# sourceMappingURL=data:application/json;base64,\".concat(btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap)))), \" */\");\n  }\n\n  // For old IE\n  /* istanbul ignore if  */\n  options.styleTagTransform(css, styleElement, options.options);\n}\nfunction removeStyleElement(styleElement) {\n  // istanbul ignore if\n  if (styleElement.parentNode === null) {\n    return false;\n  }\n  styleElement.parentNode.removeChild(styleElement);\n}\n\n/* istanbul ignore next  */\nfunction domAPI(options) {\n  if (typeof document === \"undefined\") {\n    return {\n      update: function update() {},\n      remove: function remove() {}\n    };\n  }\n  var styleElement = options.insertStyleElement(options);\n  return {\n    update: function update(obj) {\n      apply(styleElement, options, obj);\n    },\n    remove: function remove() {\n      removeStyleElement(styleElement);\n    }\n  };\n}\nmodule.exports = domAPI;\n\n//# sourceURL=webpack://blookpanel/./node_modules/style-loader/dist/runtime/styleDomAPI.js?");

/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/styleTagTransform.js":
/*!*********************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/styleTagTransform.js ***!
  \*********************************************************************/
/***/ ((module) => {

eval("\n\n/* istanbul ignore next  */\nfunction styleTagTransform(css, styleElement) {\n  if (styleElement.styleSheet) {\n    styleElement.styleSheet.cssText = css;\n  } else {\n    while (styleElement.firstChild) {\n      styleElement.removeChild(styleElement.firstChild);\n    }\n    styleElement.appendChild(document.createTextNode(css));\n  }\n}\nmodule.exports = styleTagTransform;\n\n//# sourceURL=webpack://blookpanel/./node_modules/style-loader/dist/runtime/styleTagTransform.js?");

/***/ }),

/***/ "./src/index.ts":
/*!**********************!*\
  !*** ./src/index.ts ***!
  \**********************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

eval("\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\n__webpack_require__(/*! ./style.scss */ \"./src/style.scss\");\nconst hook_1 = __webpack_require__(/*! ./lib/hook */ \"./src/lib/hook.ts\");\nconst panel_1 = __webpack_require__(/*! ./lib/panel */ \"./src/lib/panel.ts\");\nconst blooketWindow = window;\nif (blooketWindow.isPanelInjected) {\n    alert(\"Panel already injected! Aborting...\");\n    throw new Error(\"Panel already injected\");\n}\nconsole.log(\"ran!\");\nconst panelId = \"blook-panel\";\nconst panel = new panel_1.BlookPanel(\"blook-panel\");\nlet closeButton = document.getElementById(`${panelId}-close`);\ncloseButton.addEventListener('click', function () {\n    panel.shutDown(panel.rootElement, hook_1.getReactHandler, blooketWindow);\n});\nblooketWindow.isPanelInjected = true;\n// stateChangeEvent.subscribe(\"test\", {\n//     callback: function (data: EventData) {\n//         console.log(data);\n//         /*if (data.arguements[0].isCheating !== undefined) {\n//             data.arguements[0].isCheating = false\n//             console.log(data);\n//         }*/\n//         return data;\n//     },\n//     priority: EventPriority.NORMAL\n// });\n\n\n//# sourceURL=webpack://blookpanel/./src/index.ts?");

/***/ }),

/***/ "./src/lib/events.ts":
/*!***************************!*\
  !*** ./src/lib/events.ts ***!
  \***************************/
/***/ ((__unused_webpack_module, exports) => {

eval("\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\nexports.jenkinsHash = exports.EventPriority = exports.EventData = exports.StateChangeEvent = void 0;\n/**\n * Abstract class for the publish-subscribe pattern\n */\nclass StateChangeEvent {\n    constructor() {\n        this.subscribers = new Map();\n    }\n    /**\n     * Subscribe to the event using a string\n     * @param {string} name the name of the subscriber that will be used to create a hash\n     * @param {Subscriber} subscriberData data of the subscriber\n     * @returns {number} the subscriber id provided by the jenkins hash of the name field\n     */\n    subscribe(name, subscriberData) {\n        const id = jenkinsHash(name);\n        this.subscribers.set(id, subscriberData);\n        return id;\n    }\n    /**\n     * Subscribe to the event using an id\n     * @param {number} id the id of the subscriber\n     * @param {Subscriber} subscriberData data of subscriber\n     */\n    subscribeWithId(id, subscriberData) {\n        this.subscribers.set(id, subscriberData);\n    }\n    /**\n     * Unsubscribe to the event using an id\n     * @param {number} subscriberId\n     */\n    unsubscribe(subscriberId) {\n        this.subscribers.delete(subscriberId);\n    }\n    /**\n     * Emit the event and send it to every subscriber\n     *\n     */\n    emit(data) {\n        let callBackList = [];\n        for (const key of Object.values(EventPriority)) {\n            callBackList[key] = [];\n        }\n        for (let [, subscriber] of this.subscribers) {\n            callBackList[subscriber.priority].push(subscriber.callback);\n        }\n        let eventData = data;\n        for (const priority of callBackList) {\n            for (const callback of priority) {\n                eventData = callback.call(null, data);\n            }\n        }\n        return eventData;\n    }\n}\nexports.StateChangeEvent = StateChangeEvent;\nclass EventData {\n    constructor(before, arguements, time) {\n        this.before = before;\n        this.arguements = arguements;\n        this.originalArguements = arguements;\n        this.time = time;\n        this.isCanceled = false;\n    }\n}\nexports.EventData = EventData;\nvar EventPriority;\n(function (EventPriority) {\n    EventPriority[EventPriority[\"LOWEST\"] = -2] = \"LOWEST\";\n    EventPriority[EventPriority[\"LOW\"] = -1] = \"LOW\";\n    EventPriority[EventPriority[\"NORMAL\"] = 0] = \"NORMAL\";\n    EventPriority[EventPriority[\"HIGH\"] = 1] = \"HIGH\";\n    EventPriority[EventPriority[\"HIGHEST\"] = 2] = \"HIGHEST\";\n    EventPriority[EventPriority[\"MONITOR\"] = 3] = \"MONITOR\";\n})(EventPriority || (EventPriority = {}));\nexports.EventPriority = EventPriority;\n/**\n * Hashes a string to a number using the jenkinsHash\n * @param {string} str string to get the hash of\n * @returns {number} the hash result\n */\nfunction jenkinsHash(str) {\n    let hash = 0;\n    for (let i = 0; i < str.length; i++) {\n        let charCode = str.charCodeAt(i);\n        if (charCode >= 0xd800 && charCode <= 0xdbff) {\n            const highSurrogate = charCode;\n            const lowSurrogate = str.charCodeAt(++i);\n            charCode = (highSurrogate - 0xd800) * 0x400 + (lowSurrogate - 0xdc00) + 0x10000;\n        }\n        hash += charCode;\n        hash += hash << 10;\n        hash ^= hash >>> 6;\n    }\n    hash += hash << 3;\n    hash ^= hash >>> 11;\n    hash += hash << 15;\n    return hash >>> 0;\n}\nexports.jenkinsHash = jenkinsHash;\n\n\n//# sourceURL=webpack://blookpanel/./src/lib/events.ts?");

/***/ }),

/***/ "./src/lib/hook.ts":
/*!*************************!*\
  !*** ./src/lib/hook.ts ***!
  \*************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

eval("\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\nexports.isHooked = exports.unhookSetState = exports.hookSetState = exports.getReactHandler = void 0;\nconst events_1 = __webpack_require__(/*! ./events */ \"./src/lib/events.ts\");\n/**\n * The gateway to blooket hacking, gets a lot of the data (ex. state)\n * @returns {DynamicObject} The handler to access everything like `stateNode`\n */\nfunction getReactHandler() {\n    return Object.values(document.querySelector('#app > div > div'))[1].children[1]._owner;\n}\nexports.getReactHandler = getReactHandler;\nlet setStateFunction;\n/**\n * Hooks into the `setState` function to be able to make events\n * @param reactHandler game's react handler\n * @throws if the `setState` function is already hooked\n */\nfunction hookSetState(reactHandler, stateChangeEvent) {\n    if (setStateFunction !== undefined) {\n        throw new Error(\"setState function is already hooked\");\n    }\n    let oldSetState = reactHandler().stateNode.setState;\n    setStateFunction = oldSetState;\n    reactHandler().stateNode.setState = function () {\n        let result = stateChangeEvent.emit(new events_1.EventData(reactHandler().stateNode.state, arguments, Date.now()));\n        if (!result.isCanceled)\n            oldSetState.call(this, ...result.arguements);\n    };\n}\nexports.hookSetState = hookSetState;\n/**\n * Unhooks the `setState` function's event\n * @param reactHandler the handler to remove the hook from\n * @throws if the `setState` function isn't hooked\n */\nfunction unhookSetState(reactHandler) {\n    if (setStateFunction === undefined) {\n        throw new Error(\"setState function is not hooked\");\n    }\n    reactHandler().stateNode.setState = setStateFunction;\n}\nexports.unhookSetState = unhookSetState;\nfunction isHooked(reactHandler) {\n    return reactHandler().stateNode.setState != setStateFunction;\n}\nexports.isHooked = isHooked;\n\n\n//# sourceURL=webpack://blookpanel/./src/lib/hook.ts?");

/***/ }),

/***/ "./src/lib/panel.ts":
/*!**************************!*\
  !*** ./src/lib/panel.ts ***!
  \**************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

eval("\n// import minus from './../static/minus.svg';\n// import minus from './minus.svg';\n// import x from './x.svg';\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\nexports.BlookPanel = void 0;\nconst hook_1 = __webpack_require__(/*! ./hook */ \"./src/lib/hook.ts\");\nclass BlookPanel {\n    constructor(panelName) {\n        console.log(\"yes, ran\");\n        this.rootElement = document.createElement(\"div\");\n        this.rootElement.id = panelName;\n        this.rootElement.innerHTML = `\r\n            <div class=\"${panelName}-top-bar\">\r\n              <div class=\"${panelName}-text\">\r\n                <p>Blook Panel</p>\r\n              </div>\r\n              <div class=\"${panelName}-images\">\r\n                <button class=\"${panelName}-minimize\"></button>\r\n                <button class=\"${panelName}-close\"></button>\r\n              </div>\r\n            </div>\r\n            <div class=\"${panelName}-items\">\r\n              <p>Loading...</p>\r\n            </div>\r\n        `;\n        document.body.append(this.rootElement);\n        this.topBar = document.querySelector(`#${panelName} .${panelName}-top-bar`);\n        this.items = document.querySelector(`#${panelName} .${panelName}-items`);\n        this.closeButton = document.querySelector(`#${panelName} .${panelName}-top-bar .${panelName}-close`);\n        this.closeButton.innerHTML = \"-\";\n        this.minimizeButton = document.querySelector(`#${panelName} .${panelName}-top-bar .${panelName}-minimize`);\n        this.minimizeButton.innerHTML = \"x\";\n        this.makeDraggable(this.rootElement, this.topBar);\n        console.log(this.topBar, this.items, this.closeButton, this.minimizeButton);\n    }\n    /**\n     * Makes the `mainDiv` draggable using `headerDiv`\n     * @param {HTMLElement!} mainDiv\n     * @param {HTMLElement!} headerDiv\n    */\n    makeDraggable(mainDiv, headerDiv) {\n        let offsetX, offsetY;\n        let viewportWidth, viewportHeight;\n        headerDiv.addEventListener('mousedown', function (e) {\n            // Calculate the offset between the mouse position and the top-left corner of the draggable div\n            offsetX = e.clientX - mainDiv.offsetLeft;\n            offsetY = e.clientY - mainDiv.offsetTop;\n            // Get the viewport dimensions\n            viewportWidth = window.innerWidth || document.documentElement.clientWidth;\n            viewportHeight = window.innerHeight || document.documentElement.clientHeight;\n            // Attach the mousemove and mouseup event listeners\n            document.addEventListener('mousemove', handleDrag);\n            document.addEventListener('mouseup', handleDragEnd);\n        });\n        function handleDrag(e) {\n            // Calculate the new position of the draggable div\n            var newLeft = e.clientX - offsetX;\n            var newTop = e.clientY - offsetY;\n            // Restrict the movement within the viewport boundaries\n            newLeft = Math.max(0, Math.min(newLeft, viewportWidth - mainDiv.offsetWidth));\n            newTop = Math.max(0, Math.min(newTop, viewportHeight - mainDiv.offsetHeight));\n            // Update the position of the draggable div\n            mainDiv.style.left = newLeft + 'px';\n            mainDiv.style.top = newTop + 'px';\n        }\n        function handleDragEnd() {\n            // Remove the mousemove and mouseup event listeners\n            document.removeEventListener('mousemove', handleDrag);\n            document.removeEventListener('mouseup', handleDragEnd);\n        }\n    }\n    shutDown(rootElement, reactHandler, window) {\n        rootElement.remove();\n        (0, hook_1.unhookSetState)(reactHandler);\n        window.isPanelInjected = false;\n    }\n}\nexports.BlookPanel = BlookPanel;\n\n\n//# sourceURL=webpack://blookpanel/./src/lib/panel.ts?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			id: moduleId,
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/compat get default export */
/******/ 	(() => {
/******/ 		// getDefaultExport function for compatibility with non-harmony modules
/******/ 		__webpack_require__.n = (module) => {
/******/ 			var getter = module && module.__esModule ?
/******/ 				() => (module['default']) :
/******/ 				() => (module);
/******/ 			__webpack_require__.d(getter, { a: getter });
/******/ 			return getter;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/nonce */
/******/ 	(() => {
/******/ 		__webpack_require__.nc = undefined;
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = __webpack_require__("./src/index.ts");
/******/ 	
/******/ })()
;