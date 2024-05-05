import { checkCollision, generateCollisionMap } from "../utils/collisionGrid";
import {
  MovementKeyValues,
  lastPressedMovementKey,
} from "../utils/movementUtils";
import { Coordinates } from "./classes";
import { loadSprites } from "./loadSprite";
import { startEventListeners } from "./startEventListeners";

const FPS = 60;

export const startAnimation = () => {
  const map_offset: Coordinates = {
    x: -740,
    y: -590,
  };

  const { townMap, foreGroundSprite, playerDownSprite } =
    loadSprites(map_offset);
  const collisionMapBoundary = generateCollisionMap(map_offset);

  startEventListeners();

  const movables = [townMap, ...collisionMapBoundary, foreGroundSprite];

  const renderMovable = (direction: MovementKeyValues) => {
    let moving = true;
    for (let i = 0; i < collisionMapBoundary.length; i++) {
      const futureBoundary = collisionMapBoundary[i].clone();
      futureBoundary.move(direction);
      if (checkCollision(playerDownSprite, futureBoundary)) {
        moving = false;
        break;
      }
    }
    if (moving) {
      movables.forEach((movable) => {
        movable.move(direction);
      });
    }
  };

  const drawCanvas = () => {
    const directionKeyPressed = lastPressedMovementKey.slice(-1)[0];
    if (directionKeyPressed)
      playerDownSprite.playerConfig.lastDirection = directionKeyPressed;
    playerDownSprite.playerConfig.moving =
      directionKeyPressed !== MovementKeyValues.NONE;

    townMap.draw();

    playerDownSprite.draw();
    foreGroundSprite.draw();

    // Uncomment during development only
    // collisionMapBoundary.forEach((boundary) => {
    //   boundary.draw();
    // });

    renderMovable(directionKeyPressed);
  };

  const animate = () => {
    let now = Date.now();
    let elapsed = now - then;
    count++;

    // if ((now - startTime) / 1000 > 1) {
    //   console.log("Your System's Frame Rate", count);
    //   startTime = now;
    //   count = 0;
    // }

    // if enough time has elapsed, draw the next frame
    if (elapsed > fpsInterval) {
      // Get ready for next frame by setting then=now, but...
      // Also, adjust for fpsInterval not being multiple of 16.67
      then = now - (elapsed % fpsInterval);

      //draw
      drawCanvas();
    }
    window.requestAnimationFrame(animate);
  };

  const fpsInterval = 1000 / FPS;
  let startTime = Date.now();
  let count = 0;
  let then = Date.now();

  animate();
};
