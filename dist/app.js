/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/index.ts");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/index.ts":
/*!**********************!*\
  !*** ./src/index.ts ***!
  \**********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

class Color3 {
    constructor(r, g, b) {
        this.r = r;
        this.g = g;
        this.b = b;
    }
}
const color3 = (r, g, b) => new Color3(r, g, b);
const DOMAIN_CENTER_X = -0.5;
const DOMAIN_CENTER_Y = 0;
const DOMAIN_SIZE_Y = 2;
const MAX_ITERATIONS = 512;
const MAX_ITERATIONS_LOG = Math.log(MAX_ITERATIONS);
const resizeCanvas = (canvas) => {
    const displayWidth = canvas.clientWidth;
    const displayHeight = canvas.clientHeight;
    if (canvas.width !== displayWidth || canvas.height !== displayHeight) {
        canvas.width = displayWidth;
        canvas.height = displayHeight;
    }
};
const scaleDomain = (startD1, endD1, startD2, endD2, value) => {
    const magD1 = endD1 - startD1;
    const magD2 = endD2 - startD2;
    const scale = (value - startD1) / magD1;
    return startD2 + magD2 * scale;
};
const mandelbrotCheck = (x0, y0) => {
    let i = 0;
    let x = 0;
    let y = 0;
    while (i < MAX_ITERATIONS) {
        const xTmp = x * x - y * y + x0;
        y = 2 * x * y + y0;
        x = xTmp;
        if (x * x + y * y > 4) {
            return i;
        }
        i = i + 1;
    }
    return null;
};
const mandelbrotColor = (check) => {
    if (check === null) {
        return color3(0, 0, 0);
    }
    else {
        const checkSmoothed = scaleDomain(0, MAX_ITERATIONS_LOG, 0, 255, Math.log(check + 1));
        return color3(checkSmoothed, checkSmoothed, checkSmoothed);
    }
};
const mandelbrotPixels = function* (width, height) {
    let i = 0;
    const pixelCount = width * height;
    const domainStartY = DOMAIN_CENTER_Y - DOMAIN_SIZE_Y / 2;
    const domainEndY = DOMAIN_CENTER_Y + DOMAIN_SIZE_Y / 2;
    const heightToWidthRatio = height / width;
    const domainSizeX = DOMAIN_SIZE_Y / heightToWidthRatio;
    const domainStartX = DOMAIN_CENTER_X - domainSizeX / 2;
    const domainEndX = DOMAIN_CENTER_X + domainSizeX / 2;
    while (i < pixelCount) {
        const pixY = Math.floor(i / width);
        const pixX = i - pixY * width;
        const scaledX = scaleDomain(0, width - 1, domainStartX, domainEndX, pixX);
        const scaledY = scaleDomain(0, height - 1, domainStartY, domainEndY, pixY);
        const check = mandelbrotCheck(scaledX, scaledY);
        const color = mandelbrotColor(check);
        yield color.r;
        yield color.g;
        yield color.b;
        yield 255;
        i = i + 1;
    }
};
const main = () => {
    const canvas = document.getElementById("canvas");
    const ctx = canvas.getContext("2d");
    resizeCanvas(canvas);
    const image = Uint8ClampedArray.from(mandelbrotPixels(canvas.width, canvas.height));
    const imageData = new ImageData(image, canvas.width, canvas.height);
    ctx.putImageData(imageData, 0, 0);
};
window.onload = main;


/***/ })

/******/ });
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vLy4vc3JjL2luZGV4LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7UUFBQTtRQUNBOztRQUVBO1FBQ0E7O1FBRUE7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7O1FBRUE7UUFDQTs7UUFFQTtRQUNBOztRQUVBO1FBQ0E7UUFDQTs7O1FBR0E7UUFDQTs7UUFFQTtRQUNBOztRQUVBO1FBQ0E7UUFDQTtRQUNBLDBDQUEwQyxnQ0FBZ0M7UUFDMUU7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7UUFDQSx3REFBd0Qsa0JBQWtCO1FBQzFFO1FBQ0EsaURBQWlELGNBQWM7UUFDL0Q7O1FBRUE7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBLHlDQUF5QyxpQ0FBaUM7UUFDMUUsZ0hBQWdILG1CQUFtQixFQUFFO1FBQ3JJO1FBQ0E7O1FBRUE7UUFDQTtRQUNBO1FBQ0EsMkJBQTJCLDBCQUEwQixFQUFFO1FBQ3ZELGlDQUFpQyxlQUFlO1FBQ2hEO1FBQ0E7UUFDQTs7UUFFQTtRQUNBLHNEQUFzRCwrREFBK0Q7O1FBRXJIO1FBQ0E7OztRQUdBO1FBQ0E7Ozs7Ozs7Ozs7Ozs7QUNsRmE7QUFDYjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBIiwiZmlsZSI6ImFwcC5qcyIsInNvdXJjZXNDb250ZW50IjpbIiBcdC8vIFRoZSBtb2R1bGUgY2FjaGVcbiBcdHZhciBpbnN0YWxsZWRNb2R1bGVzID0ge307XG5cbiBcdC8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG4gXHRmdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cbiBcdFx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG4gXHRcdGlmKGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdKSB7XG4gXHRcdFx0cmV0dXJuIGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdLmV4cG9ydHM7XG4gXHRcdH1cbiBcdFx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcbiBcdFx0dmFyIG1vZHVsZSA9IGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdID0ge1xuIFx0XHRcdGk6IG1vZHVsZUlkLFxuIFx0XHRcdGw6IGZhbHNlLFxuIFx0XHRcdGV4cG9ydHM6IHt9XG4gXHRcdH07XG5cbiBcdFx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG4gXHRcdG1vZHVsZXNbbW9kdWxlSWRdLmNhbGwobW9kdWxlLmV4cG9ydHMsIG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG4gXHRcdC8vIEZsYWcgdGhlIG1vZHVsZSBhcyBsb2FkZWRcbiBcdFx0bW9kdWxlLmwgPSB0cnVlO1xuXG4gXHRcdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG4gXHRcdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbiBcdH1cblxuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZXMgb2JqZWN0IChfX3dlYnBhY2tfbW9kdWxlc19fKVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5tID0gbW9kdWxlcztcblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGUgY2FjaGVcbiBcdF9fd2VicGFja19yZXF1aXJlX18uYyA9IGluc3RhbGxlZE1vZHVsZXM7XG5cbiBcdC8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb24gZm9yIGhhcm1vbnkgZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kID0gZnVuY3Rpb24oZXhwb3J0cywgbmFtZSwgZ2V0dGVyKSB7XG4gXHRcdGlmKCFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywgbmFtZSkpIHtcbiBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgbmFtZSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGdldHRlciB9KTtcbiBcdFx0fVxuIFx0fTtcblxuIFx0Ly8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5yID0gZnVuY3Rpb24oZXhwb3J0cykge1xuIFx0XHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcbiBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcbiBcdFx0fVxuIFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xuIFx0fTtcblxuIFx0Ly8gY3JlYXRlIGEgZmFrZSBuYW1lc3BhY2Ugb2JqZWN0XG4gXHQvLyBtb2RlICYgMTogdmFsdWUgaXMgYSBtb2R1bGUgaWQsIHJlcXVpcmUgaXRcbiBcdC8vIG1vZGUgJiAyOiBtZXJnZSBhbGwgcHJvcGVydGllcyBvZiB2YWx1ZSBpbnRvIHRoZSBuc1xuIFx0Ly8gbW9kZSAmIDQ6IHJldHVybiB2YWx1ZSB3aGVuIGFscmVhZHkgbnMgb2JqZWN0XG4gXHQvLyBtb2RlICYgOHwxOiBiZWhhdmUgbGlrZSByZXF1aXJlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnQgPSBmdW5jdGlvbih2YWx1ZSwgbW9kZSkge1xuIFx0XHRpZihtb2RlICYgMSkgdmFsdWUgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKHZhbHVlKTtcbiBcdFx0aWYobW9kZSAmIDgpIHJldHVybiB2YWx1ZTtcbiBcdFx0aWYoKG1vZGUgJiA0KSAmJiB0eXBlb2YgdmFsdWUgPT09ICdvYmplY3QnICYmIHZhbHVlICYmIHZhbHVlLl9fZXNNb2R1bGUpIHJldHVybiB2YWx1ZTtcbiBcdFx0dmFyIG5zID0gT2JqZWN0LmNyZWF0ZShudWxsKTtcbiBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5yKG5zKTtcbiBcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KG5zLCAnZGVmYXVsdCcsIHsgZW51bWVyYWJsZTogdHJ1ZSwgdmFsdWU6IHZhbHVlIH0pO1xuIFx0XHRpZihtb2RlICYgMiAmJiB0eXBlb2YgdmFsdWUgIT0gJ3N0cmluZycpIGZvcih2YXIga2V5IGluIHZhbHVlKSBfX3dlYnBhY2tfcmVxdWlyZV9fLmQobnMsIGtleSwgZnVuY3Rpb24oa2V5KSB7IHJldHVybiB2YWx1ZVtrZXldOyB9LmJpbmQobnVsbCwga2V5KSk7XG4gXHRcdHJldHVybiBucztcbiBcdH07XG5cbiBcdC8vIGdldERlZmF1bHRFeHBvcnQgZnVuY3Rpb24gZm9yIGNvbXBhdGliaWxpdHkgd2l0aCBub24taGFybW9ueSBtb2R1bGVzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm4gPSBmdW5jdGlvbihtb2R1bGUpIHtcbiBcdFx0dmFyIGdldHRlciA9IG1vZHVsZSAmJiBtb2R1bGUuX19lc01vZHVsZSA/XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0RGVmYXVsdCgpIHsgcmV0dXJuIG1vZHVsZVsnZGVmYXVsdCddOyB9IDpcbiBcdFx0XHRmdW5jdGlvbiBnZXRNb2R1bGVFeHBvcnRzKCkgeyByZXR1cm4gbW9kdWxlOyB9O1xuIFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQoZ2V0dGVyLCAnYScsIGdldHRlcik7XG4gXHRcdHJldHVybiBnZXR0ZXI7XG4gXHR9O1xuXG4gXHQvLyBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGxcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubyA9IGZ1bmN0aW9uKG9iamVjdCwgcHJvcGVydHkpIHsgcmV0dXJuIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmplY3QsIHByb3BlcnR5KTsgfTtcblxuIFx0Ly8gX193ZWJwYWNrX3B1YmxpY19wYXRoX19cbiBcdF9fd2VicGFja19yZXF1aXJlX18ucCA9IFwiXCI7XG5cblxuIFx0Ly8gTG9hZCBlbnRyeSBtb2R1bGUgYW5kIHJldHVybiBleHBvcnRzXG4gXHRyZXR1cm4gX193ZWJwYWNrX3JlcXVpcmVfXyhfX3dlYnBhY2tfcmVxdWlyZV9fLnMgPSBcIi4vc3JjL2luZGV4LnRzXCIpO1xuIiwiXCJ1c2Ugc3RyaWN0XCI7XG5jbGFzcyBDb2xvcjMge1xuICAgIGNvbnN0cnVjdG9yKHIsIGcsIGIpIHtcbiAgICAgICAgdGhpcy5yID0gcjtcbiAgICAgICAgdGhpcy5nID0gZztcbiAgICAgICAgdGhpcy5iID0gYjtcbiAgICB9XG59XG5jb25zdCBjb2xvcjMgPSAociwgZywgYikgPT4gbmV3IENvbG9yMyhyLCBnLCBiKTtcbmNvbnN0IERPTUFJTl9DRU5URVJfWCA9IC0wLjU7XG5jb25zdCBET01BSU5fQ0VOVEVSX1kgPSAwO1xuY29uc3QgRE9NQUlOX1NJWkVfWSA9IDI7XG5jb25zdCBNQVhfSVRFUkFUSU9OUyA9IDUxMjtcbmNvbnN0IE1BWF9JVEVSQVRJT05TX0xPRyA9IE1hdGgubG9nKE1BWF9JVEVSQVRJT05TKTtcbmNvbnN0IHJlc2l6ZUNhbnZhcyA9IChjYW52YXMpID0+IHtcbiAgICBjb25zdCBkaXNwbGF5V2lkdGggPSBjYW52YXMuY2xpZW50V2lkdGg7XG4gICAgY29uc3QgZGlzcGxheUhlaWdodCA9IGNhbnZhcy5jbGllbnRIZWlnaHQ7XG4gICAgaWYgKGNhbnZhcy53aWR0aCAhPT0gZGlzcGxheVdpZHRoIHx8IGNhbnZhcy5oZWlnaHQgIT09IGRpc3BsYXlIZWlnaHQpIHtcbiAgICAgICAgY2FudmFzLndpZHRoID0gZGlzcGxheVdpZHRoO1xuICAgICAgICBjYW52YXMuaGVpZ2h0ID0gZGlzcGxheUhlaWdodDtcbiAgICB9XG59O1xuY29uc3Qgc2NhbGVEb21haW4gPSAoc3RhcnREMSwgZW5kRDEsIHN0YXJ0RDIsIGVuZEQyLCB2YWx1ZSkgPT4ge1xuICAgIGNvbnN0IG1hZ0QxID0gZW5kRDEgLSBzdGFydEQxO1xuICAgIGNvbnN0IG1hZ0QyID0gZW5kRDIgLSBzdGFydEQyO1xuICAgIGNvbnN0IHNjYWxlID0gKHZhbHVlIC0gc3RhcnREMSkgLyBtYWdEMTtcbiAgICByZXR1cm4gc3RhcnREMiArIG1hZ0QyICogc2NhbGU7XG59O1xuY29uc3QgbWFuZGVsYnJvdENoZWNrID0gKHgwLCB5MCkgPT4ge1xuICAgIGxldCBpID0gMDtcbiAgICBsZXQgeCA9IDA7XG4gICAgbGV0IHkgPSAwO1xuICAgIHdoaWxlIChpIDwgTUFYX0lURVJBVElPTlMpIHtcbiAgICAgICAgY29uc3QgeFRtcCA9IHggKiB4IC0geSAqIHkgKyB4MDtcbiAgICAgICAgeSA9IDIgKiB4ICogeSArIHkwO1xuICAgICAgICB4ID0geFRtcDtcbiAgICAgICAgaWYgKHggKiB4ICsgeSAqIHkgPiA0KSB7XG4gICAgICAgICAgICByZXR1cm4gaTtcbiAgICAgICAgfVxuICAgICAgICBpID0gaSArIDE7XG4gICAgfVxuICAgIHJldHVybiBudWxsO1xufTtcbmNvbnN0IG1hbmRlbGJyb3RDb2xvciA9IChjaGVjaykgPT4ge1xuICAgIGlmIChjaGVjayA9PT0gbnVsbCkge1xuICAgICAgICByZXR1cm4gY29sb3IzKDAsIDAsIDApO1xuICAgIH1cbiAgICBlbHNlIHtcbiAgICAgICAgY29uc3QgY2hlY2tTbW9vdGhlZCA9IHNjYWxlRG9tYWluKDAsIE1BWF9JVEVSQVRJT05TX0xPRywgMCwgMjU1LCBNYXRoLmxvZyhjaGVjayArIDEpKTtcbiAgICAgICAgcmV0dXJuIGNvbG9yMyhjaGVja1Ntb290aGVkLCBjaGVja1Ntb290aGVkLCBjaGVja1Ntb290aGVkKTtcbiAgICB9XG59O1xuY29uc3QgbWFuZGVsYnJvdFBpeGVscyA9IGZ1bmN0aW9uKiAod2lkdGgsIGhlaWdodCkge1xuICAgIGxldCBpID0gMDtcbiAgICBjb25zdCBwaXhlbENvdW50ID0gd2lkdGggKiBoZWlnaHQ7XG4gICAgY29uc3QgZG9tYWluU3RhcnRZID0gRE9NQUlOX0NFTlRFUl9ZIC0gRE9NQUlOX1NJWkVfWSAvIDI7XG4gICAgY29uc3QgZG9tYWluRW5kWSA9IERPTUFJTl9DRU5URVJfWSArIERPTUFJTl9TSVpFX1kgLyAyO1xuICAgIGNvbnN0IGhlaWdodFRvV2lkdGhSYXRpbyA9IGhlaWdodCAvIHdpZHRoO1xuICAgIGNvbnN0IGRvbWFpblNpemVYID0gRE9NQUlOX1NJWkVfWSAvIGhlaWdodFRvV2lkdGhSYXRpbztcbiAgICBjb25zdCBkb21haW5TdGFydFggPSBET01BSU5fQ0VOVEVSX1ggLSBkb21haW5TaXplWCAvIDI7XG4gICAgY29uc3QgZG9tYWluRW5kWCA9IERPTUFJTl9DRU5URVJfWCArIGRvbWFpblNpemVYIC8gMjtcbiAgICB3aGlsZSAoaSA8IHBpeGVsQ291bnQpIHtcbiAgICAgICAgY29uc3QgcGl4WSA9IE1hdGguZmxvb3IoaSAvIHdpZHRoKTtcbiAgICAgICAgY29uc3QgcGl4WCA9IGkgLSBwaXhZICogd2lkdGg7XG4gICAgICAgIGNvbnN0IHNjYWxlZFggPSBzY2FsZURvbWFpbigwLCB3aWR0aCAtIDEsIGRvbWFpblN0YXJ0WCwgZG9tYWluRW5kWCwgcGl4WCk7XG4gICAgICAgIGNvbnN0IHNjYWxlZFkgPSBzY2FsZURvbWFpbigwLCBoZWlnaHQgLSAxLCBkb21haW5TdGFydFksIGRvbWFpbkVuZFksIHBpeFkpO1xuICAgICAgICBjb25zdCBjaGVjayA9IG1hbmRlbGJyb3RDaGVjayhzY2FsZWRYLCBzY2FsZWRZKTtcbiAgICAgICAgY29uc3QgY29sb3IgPSBtYW5kZWxicm90Q29sb3IoY2hlY2spO1xuICAgICAgICB5aWVsZCBjb2xvci5yO1xuICAgICAgICB5aWVsZCBjb2xvci5nO1xuICAgICAgICB5aWVsZCBjb2xvci5iO1xuICAgICAgICB5aWVsZCAyNTU7XG4gICAgICAgIGkgPSBpICsgMTtcbiAgICB9XG59O1xuY29uc3QgbWFpbiA9ICgpID0+IHtcbiAgICBjb25zdCBjYW52YXMgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImNhbnZhc1wiKTtcbiAgICBjb25zdCBjdHggPSBjYW52YXMuZ2V0Q29udGV4dChcIjJkXCIpO1xuICAgIHJlc2l6ZUNhbnZhcyhjYW52YXMpO1xuICAgIGNvbnN0IGltYWdlID0gVWludDhDbGFtcGVkQXJyYXkuZnJvbShtYW5kZWxicm90UGl4ZWxzKGNhbnZhcy53aWR0aCwgY2FudmFzLmhlaWdodCkpO1xuICAgIGNvbnN0IGltYWdlRGF0YSA9IG5ldyBJbWFnZURhdGEoaW1hZ2UsIGNhbnZhcy53aWR0aCwgY2FudmFzLmhlaWdodCk7XG4gICAgY3R4LnB1dEltYWdlRGF0YShpbWFnZURhdGEsIDAsIDApO1xufTtcbndpbmRvdy5vbmxvYWQgPSBtYWluO1xuIl0sInNvdXJjZVJvb3QiOiIifQ==