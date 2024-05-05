import { checkCollision, generateCollisionMap } from "../utils/collisionGrid";
import { CANVAS_HEIGHT, CANVAS_WIDTH, WALK_VELOCITY } from "../utils/constants";
import {
  MovementKeyValues,
  lastPressedMovementKey,
} from "../utils/movementUtils";
import { BaseSprite, Boundary, Coordinates, Sprite } from "./classes";
import { canvasCtx } from "./initiateCanvas";
import { mapImg, playerDownImg } from "./loadSprite";
import { startEventListeners } from "./startEventListeners";

export const startAnimation = () => {
  const map_offset: Coordinates = {
    x: -740,
    y: -590,
  };

  const townMap = new Sprite({
    image: mapImg,
    position: map_offset,
    velocity: WALK_VELOCITY,
  });
  const playerDownSprite = new Sprite({
    image: playerDownImg,
    position: {
      x: CANVAS_WIDTH / 2 - playerDownImg.width / 4 / 2,
      y: CANVAS_HEIGHT / 2 - playerDownImg.height / 4 / 2,
    },
    frame: {
      frameCount: 4,
    },
    velocity: WALK_VELOCITY,
  });

  const collisionMapBoundary = generateCollisionMap(map_offset);

  // const testBOundary = new Boundary({ x: 200, y: 400 });
  // collisionMapBoundary.splice(0, collisionMapBoundary.length);
  // collisionMapBoundary.push(testBOundary);

  startEventListeners();

  const movables = [townMap, ...collisionMapBoundary];

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

    // Uncomment during development only
    // collisionMapBoundary.forEach((boundary) => {
    //   boundary.draw();
    // });

    renderMovable(lastPressedMovementKey.slice(-1)[0]);

    window.requestAnimationFrame(animate);
  };
  animate();
};
