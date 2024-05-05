import { CANVAS_HEIGHT, CANVAS_WIDTH, WALK_VELOCITY } from "../utils/constants";
import {
  MovementKeyValues,
  lastPressedMovementKey,
} from "../utils/movementUtils";
import { Coordinates, Sprite } from "./classes";
import { canvasCtx } from "./initiateCanvas";
import { mapImg, playerDownImg } from "./loadSprite";
import { startEventListeners } from "./startEventListeners";

export const startAnimation = () => {
  const map_offset: Coordinates = {
    x: -740,
    y: -550,
  };

  const townMap = new Sprite(mapImg, map_offset);

  startEventListeners();

  const animate = () => {
    townMap.draw();

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

    switch (lastPressedMovementKey.slice(-1)[0]) {
      case MovementKeyValues.DOWN:
        townMap.moveDown(WALK_VELOCITY);
        break;
      case MovementKeyValues.UP:
        townMap.moveUp(WALK_VELOCITY);
        break;
      case MovementKeyValues.LEFT:
        townMap.moveLeft(WALK_VELOCITY);
        break;
      case MovementKeyValues.RIGHT:
        townMap.moveRight(WALK_VELOCITY);
        break;
    }

    window.requestAnimationFrame(animate);
  };
  animate();
};
