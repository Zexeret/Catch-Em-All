import { Monster, MonsterList } from "../monster";
import { AnimateOnCanvas } from "../utils/animate";
import { FPS } from "../utils/constants";
import { getSprites, loadSprites } from "./loadSprite";
import { resumeTownAnimation } from "./startTownAnimation";

export const startBattleAnimation = () => {
  const { battleGroundSprite } = getSprites();
  let temp = 1;

  const emby = 0;

  const drawBattleGround = () => {
    battleGroundSprite.draw();

    if (temp === 1) {
      temp = 0;
      console.log(emby);
    }
  };

  const battleGroundAnimationController = new AnimateOnCanvas(
    FPS,
    drawBattleGround
  );

  // setTimeout(() => {
  //   battleGroundAnimationController.stopAnimationRender();
  //   resumeTownAnimation();
  // }, 10000);
};
