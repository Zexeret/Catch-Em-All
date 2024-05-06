import { CANVAS_HEIGHT, CANVAS_WIDTH } from "../utils/constants";

export let canvasCtx: CanvasRenderingContext2D;

export const initiateCanvas = () => {
  const canvas: HTMLCanvasElement = document.querySelector("canvas");

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
