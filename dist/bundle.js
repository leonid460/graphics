/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is not neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/Dot.ts":
/*!********************!*\
  !*** ./src/Dot.ts ***!
  \********************/
/*! flagged exports */
/*! export Dot [provided] [no usage info] [missing usage info prevents renaming] */
/*! export __esModule [provided] [no usage info] [missing usage info prevents renaming] */
/*! other exports [not provided] [no usage info] */
/*! runtime requirements: __webpack_exports__, __webpack_require__ */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

eval("\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\nexports.Dot = void 0;\nconst globalState_1 = __webpack_require__(/*! ./globalState */ \"./src/globalState.ts\");\nclass Dot {\n    constructor() {\n        this.x = (Math.random() - 0.5) * globalState_1.globalState.width;\n        this.y = (Math.random() - 0.5) * globalState_1.globalState.height;\n        this.z = Math.random() * globalState_1.globalState.width;\n        this.radius = 10;\n        this.xProjected = 0;\n        this.yProjected = 0;\n        this.scaleProjected = 0;\n    }\n    project3DOn2d() {\n        this.scaleProjected = globalState_1.globalState.perspective / (globalState_1.globalState.perspective + this.z);\n        this.xProjected = (this.x * this.scaleProjected) + globalState_1.globalState.projectionCenterX;\n        this.yProjected = (this.y * this.scaleProjected) + globalState_1.globalState.projectionCenterY;\n    }\n    draw() {\n        if (!globalState_1.globalState.context) {\n            throw new Error('No context in global state');\n        }\n        this.project3DOn2d();\n        const opacity = Math.abs(1 - this.z / globalState_1.globalState.width);\n        const projectedX = this.xProjected - this.radius;\n        const projectedY = this.yProjected - this.radius;\n        const projectedScale = this.radius * 2 * this.scaleProjected;\n        globalState_1.globalState.context.globalAlpha = opacity;\n        globalState_1.globalState.context.fillRect(projectedX, projectedY, projectedScale, projectedScale);\n    }\n}\nexports.Dot = Dot;\n\n\n//# sourceURL=webpack://graphics/./src/Dot.ts?");

/***/ }),

/***/ "./src/globalState.ts":
/*!****************************!*\
  !*** ./src/globalState.ts ***!
  \****************************/
/*! flagged exports */
/*! export __esModule [provided] [no usage info] [missing usage info prevents renaming] */
/*! export globalState [provided] [no usage info] [missing usage info prevents renaming] */
/*! other exports [not provided] [no usage info] */
/*! runtime requirements: __webpack_exports__ */
/***/ ((__unused_webpack_module, exports) => {

eval("\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\nexports.globalState = void 0;\nexports.globalState = {\n    width: 0,\n    height: 0,\n    perspective: 0,\n    projectionCenterX: 0,\n    projectionCenterY: 0\n};\n\n\n//# sourceURL=webpack://graphics/./src/globalState.ts?");

/***/ }),

/***/ "./src/index.ts":
/*!**********************!*\
  !*** ./src/index.ts ***!
  \**********************/
/*! flagged exports */
/*! export __esModule [provided] [no usage info] [missing usage info prevents renaming] */
/*! other exports [not provided] [no usage info] */
/*! runtime requirements: __webpack_exports__, __webpack_require__ */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

eval("\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\nconst globalState_1 = __webpack_require__(/*! ./globalState */ \"./src/globalState.ts\");\nconst Dot_1 = __webpack_require__(/*! ./Dot */ \"./src/Dot.ts\");\nfunction setUpCanvas(inputPerspective) {\n    const canvas = document.getElementById('scene');\n    let width = canvas.offsetWidth; // Width of the scene\n    let height = canvas.offsetHeight; // Height of the scene\n    const ctx = canvas.getContext('2d');\n    function onResize() {\n        // We need to define the dimensions of the canvas to our canvas element\n        // Javascript doesn't know the computed dimensions from CSS so we need to do it manually\n        width = canvas.offsetWidth;\n        height = canvas.offsetHeight;\n        // If the screen device has a pixel ratio over 1\n        // We render the canvas twice bigger to make it sharper (e.g. Retina iPhone)\n        if (window.devicePixelRatio > 1) {\n            canvas.width = canvas.clientWidth * 2;\n            canvas.height = canvas.clientHeight * 2;\n            ctx.scale(2, 2);\n        }\n        else {\n            canvas.width = width;\n            canvas.height = height;\n        }\n    }\n    window.addEventListener('resize', onResize);\n    // Make sure the canvas size is perfect\n    onResize();\n    globalState_1.globalState.canvas = canvas;\n    globalState_1.globalState.context = ctx;\n    globalState_1.globalState.width = width;\n    globalState_1.globalState.height = height;\n    globalState_1.globalState.perspective = width * inputPerspective;\n    globalState_1.globalState.projectionCenterX = width / 2;\n    globalState_1.globalState.projectionCenterY = height / 2;\n}\nfunction renderDots(dots) {\n    if (!globalState_1.globalState.context) {\n        throw new Error('No canvas context in global state');\n    }\n    globalState_1.globalState.context.clearRect(0, 0, globalState_1.globalState.width, globalState_1.globalState.height);\n    for (let i = 0; i < dots.length; i++) {\n        dots[i].draw();\n    }\n    window.requestAnimationFrame(() => renderDots(dots));\n}\nvoid function main() {\n    setUpCanvas(0.8);\n    const dots = [];\n    for (let i = 0; i < 800; i++) {\n        dots.push(new Dot_1.Dot());\n    }\n    renderDots(dots);\n}();\n\n\n//# sourceURL=webpack://graphics/./src/index.ts?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		if(__webpack_module_cache__[moduleId]) {
/******/ 			return __webpack_module_cache__[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
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
/******/ 	// startup
/******/ 	// Load entry module
/******/ 	__webpack_require__("./src/index.ts");
/******/ 	// This entry module used 'exports' so it can't be inlined
/******/ })()
;