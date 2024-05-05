import { checkCollision, generateCollisionMap } from "../utils/collisionGrid";
import {
  MovementKeyValues,
  lastPressedMovementKey,
} from "../utils/movementUtils";
import { Coordinates } from "./classes";
import { loadSprites } from "./loadSprite";
import { startEventListeners } from "./startEventListeners";

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

  const animate = () => {
    townMap.draw();

    playerDownSprite.draw();
    foreGroundSprite.draw();

    // Uncomment during development only
    // collisionMapBoundary.forEach((boundary) => {
    //   boundary.draw();
    // });

    renderMovable(lastPressedMovementKey.slice(-1)[0]);

    window.requestAnimationFrame(animate);
  };
  animate();
};
