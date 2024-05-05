import { canvasCtx, initiateCanvas, mapImg } from "./src/core";

initiateCanvas();

const map_offset = {
  x: -750,
  y: -550,
};

mapImg.onload = () => {
  canvasCtx.drawImage(mapImg, map_offset.x, map_offset.y);
};
