import {
  CANVAS_HEIGHT,
  CANVAS_WIDTH,
  FADE_IN_ANIMATION_TIME,
  FADE_OUT_ANIMATION_TIME,
  FLASH_ANIMATION_TIME,
} from "../utils/constants";

export let canvasCtx: CanvasRenderingContext2D;
let canvas: HTMLCanvasElement;
let canvasCover: HTMLElement;

export const initiateCanvas = () => {
  canvas = document.querySelector("canvas");
  canvasCover = document.getElementById("canvasCover");

  canvasCtx = canvas.getContext("2d");

  canvas.width = CANVAS_WIDTH;
  canvas.height = CANVAS_HEIGHT;

  canvasCtx.fillStyle = "white";
  canvasCtx.fillRect(0, 0, canvas.width, canvas.height);
};

export const resetCanvasDraw = () => {
  canvasCtx.fillStyle = "black";
  canvasCtx.fillRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
};

export const flashAnimation = ({
  resetTime = FLASH_ANIMATION_TIME,
  callbackFun = () => {},
}) => {
  canvasCover.classList.add("flashAnimation");

  setTimeout(() => {
    canvasCover.classList.remove("flashAnimation");
    callbackFun();
  }, resetTime);
};

export const fadeIn = ({
  resetTime = FADE_IN_ANIMATION_TIME,
  callbackFun = () => {},
}) => {
  canvasCover.classList.add("fadeInAnimation");

  setTimeout(() => {
    canvasCover.classList.remove("fadeInAnimation");
    callbackFun();
  }, resetTime);
};

export const fadeOut = ({
  resetTime = FADE_OUT_ANIMATION_TIME,
  callbackFun = () => {},
}) => {
  canvasCover.classList.add("fadeOutAnimation");

  setTimeout(() => {
    canvasCover.classList.remove("fadeOutAnimation");
    callbackFun();
  }, resetTime);
};
