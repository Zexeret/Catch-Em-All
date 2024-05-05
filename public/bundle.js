(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("./src/core");
(0, core_1.initiateCanvas)();
const map_offset = {
    x: -750,
    y: -550,
};
core_1.mapImg.onload = () => {
    core_1.canvasCtx.drawImage(core_1.mapImg, map_offset.x, map_offset.y);
};

},{"./src/core":2}],2:[function(require,module,exports){
"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __exportStar = (this && this.__exportStar) || function(m, exports) {
    for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
};
Object.defineProperty(exports, "__esModule", { value: true });
__exportStar(require("./initiateCanvas"), exports);
__exportStar(require("./loadSprite"), exports);

},{"./initiateCanvas":3,"./loadSprite":4}],3:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.initiateCanvas = exports.canvasCtx = void 0;
const constants_1 = require("../utils/constants");
const initiateCanvas = () => {
    const canvas = document.querySelector("canvas");
    exports.canvasCtx = canvas.getContext("2d");
    canvas.width = constants_1.CANVAS_WIDTH;
    canvas.height = constants_1.CANVAS_HEIGHT;
    exports.canvasCtx.fillStyle = "white";
    exports.canvasCtx.fillRect(0, 0, canvas.width, canvas.height);
};
exports.initiateCanvas = initiateCanvas;

},{"../utils/constants":5}],4:[function(require,module,exports){
"use strict";
// All the src are w.r.t index.html file
Object.defineProperty(exports, "__esModule", { value: true });
exports.playerDownImg = exports.mapImg = void 0;
exports.mapImg = new Image();
exports.mapImg.src = "../src/assets/images/Pellet Town.png";
exports.playerDownImg = new Image();
exports.playerDownImg.src = "../src/assets/images/playerDown.png";

},{}],5:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CANVAS_HEIGHT = exports.CANVAS_WIDTH = void 0;
exports.CANVAS_WIDTH = 1024;
exports.CANVAS_HEIGHT = 576;

},{}]},{},[1]);
