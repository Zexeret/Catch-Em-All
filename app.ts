import { canvasCtx, initiateCanvas, mapImg, playerDownImg } from "./src/core";
import { CANVAS_HEIGHT, CANVAS_WIDTH } from "./src/utils/constants";

initiateCanvas();

const map_offset = {
  x: -740,
  y: -550,
};

mapImg.onload = () => {
  canvasCtx.drawImage(mapImg, map_offset.x, map_offset.y);

  canvasCtx.drawImage(
    playerDownImg,
    0,
    0,
    playerDownImg.width / 4,
    playerDownImg.height,
    CANVAS_WIDTH / 2 - playerDownImg.width / 4 / 2,
    CANVAS_HEIGHT / 2 - playerDownImg.height / 4 / 2,
    playerDownImg.width / 4,
    playerDownImg.height
  );
};
