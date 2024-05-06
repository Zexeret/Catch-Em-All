import { AnimateOnCanvas } from "../utils/animate";
import { generateBattleZoneMap } from "../utils/battleZone";
import { checkCollision, generateCollisionMap } from "../utils/collisionGrid";
import {
  BATTLE_SCREEN_ACTIVATION_TIME,
  FPS,
  POKEMON_COLLISION_PERCENTAGE,
} from "../utils/constants";
import {
  MovementKeyValues,
  lastPressedMovementKey,
} from "../utils/movementUtils";
import { Boundary, Coordinates, Sprite } from "./classes";
import { resetCanvasDraw } from "./canvas";
import { getSprites, loadSprites } from "./loadSprite";
import { startEventListeners } from "./startEventListeners";
import { startBattleAnimation } from "./startBattleAnimation";

export let resumeTownAnimation: () => void;

export const startTownAnimation = () => {
  const map_offset: Coordinates = {
    x: -740,
    y: -590,
  };
  const canvasCover = document.getElementById("canvasCover");

  loadSprites(map_offset);
  const { townMap, foreGroundSprite, playerDownSprite } = getSprites();
  const collisionMapBoundary = generateCollisionMap(map_offset);
  const battleZoneMapBoundary = generateBattleZoneMap(map_offset);

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
          canvasCover.classList.add("flashAnimation");

          // 2 seconds because thats the duration of our screen flashing animation
          setTimeout(() => {
            canvasCover.classList.remove("flashAnimation");
            resetCanvasDraw();
            startBattleAnimation();
          }, BATTLE_SCREEN_ACTIVATION_TIME);
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
    collisionMapBoundary.forEach((boundary) => {
      boundary.draw();
    });
    battleZoneMapBoundary.forEach((boundary) => {
      boundary.draw();
    });

    renderMovable(directionKeyPressed);
  };

  const townAnimationController = new AnimateOnCanvas(FPS, drawTownMap);

  const resumeAnimation = () => {
    townAnimationController.startAnimationRender();
  };
  resumeTownAnimation = resumeAnimation;
};
