import { AnimateOnCanvas } from "../utils/animate";
import { FPS } from "../utils/constants";
import { getSprites, loadSprites } from "./loadSprite";
import { resumeTownAnimation } from "./startTownAnimation";

export const startBattleAnimation = () => {
  const { battleGroundSprite } = getSprites();
  const drawBattleGround = () => {
    battleGroundSprite.draw();
  };

  const battleGroundAnimationController = new AnimateOnCanvas(
    FPS,
    drawBattleGround
  );

  setTimeout(() => {
    battleGroundAnimationController.stopAnimationRender();
    resumeTownAnimation();
  }, 10000);
};
