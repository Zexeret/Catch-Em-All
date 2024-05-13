import { AnimateOnCanvas } from "../utils/animate";
import { generateBattleZoneMap } from "../utils/battleZone";
import { checkCollision, generateCollisionMap } from "../utils/collisionGrid";
import {
  FLASH_ANIMATION_TIME,
  FPS,
  INITIAL_MAP_OFFSET,
  POKEMON_COLLISION_PERCENTAGE,
} from "../utils/constants";
import {
  MovementKeyValues,
  lastPressedMovementKey,
} from "../utils/movementUtils";
import { Boundary, Coordinates, Sprite } from "./classes";
import { fadeIn, flashAnimation, resetCanvasDraw } from "./canvas";
import { getSprites, loadSprites } from "./loadSprite";
import { startEventListeners } from "./startEventListeners";
import { startBattleAnimation } from "./startBattleAnimation";

export let resumeTownAnimation: () => void;

export const startTownAnimation = () => {
  const { townMap, foreGroundSprite, playerDownSprite } = getSprites();
  const collisionMapBoundary = generateCollisionMap(INITIAL_MAP_OFFSET);
  const battleZoneMapBoundary = generateBattleZoneMap(INITIAL_MAP_OFFSET);

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
          townAnimationController.stopAnimationRender();
          flashAnimation({
            callbackFun: () => {
              resetCanvasDraw();
              startBattleAnimation();
              fadeIn({});
            },
          });
          break;
        }
      }
    }
  };

  const drawTownMap = () => {
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
    // battleZoneMapBoundary.forEach((boundary) => {
    //   boundary.draw();
    // });

    renderMovable(directionKeyPressed);
  };

  const townAnimationController = new AnimateOnCanvas(FPS, drawTownMap);

  const resumeAnimation = () => {
    townAnimationController.startAnimationRender();
  };
  resumeTownAnimation = resumeAnimation;
};
