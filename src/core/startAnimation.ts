import { generateBattleZoneMap } from "../utils/battleZone";
import { checkCollision, generateCollisionMap } from "../utils/collisionGrid";
import { POKEMON_COLLISION_PERCENTAGE } from "../utils/constants";
import {
  MovementKeyValues,
  lastPressedMovementKey,
} from "../utils/movementUtils";
import { Boundary, Coordinates, Sprite } from "./classes";
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
  const battleZoneMapBoundary = generateBattleZoneMap(map_offset);

  startEventListeners();

  const movables: Array<Sprite | Boundary> = [
    townMap,
    ...collisionMapBoundary,
    foreGroundSprite,
    ...battleZoneMapBoundary,
  ];

  const renderMovable = (direction: MovementKeyValues) => {
    let moving = true;
    if (direction === MovementKeyValues.NONE) return;

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

      for (let i = 0; i < battleZoneMapBoundary.length; i++) {
        if (
          checkCollision(playerDownSprite, battleZoneMapBoundary[i]) &&
          Math.random() * 100 < POKEMON_COLLISION_PERCENTAGE
        ) {
          console.log("Battle Zone Activation");
          break;
        }
      }
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
    collisionMapBoundary.forEach((boundary) => {
      boundary.draw();
    });
    battleZoneMapBoundary.forEach((boundary) => {
      boundary.draw();
    });

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
