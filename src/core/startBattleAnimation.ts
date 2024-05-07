import { Monster, MonsterList } from "../monster";
import { AnimateOnCanvas } from "../utils/animate";
import { FPS } from "../utils/constants";
import { getSprites, loadSprites } from "./loadSprite";
import { resumeTownAnimation } from "./startTownAnimation";

export const startBattleAnimation = () => {
  const { battleGroundSprite } = getSprites();

  const emby = new Monster(MonsterList.EMBERY);
  const draggo = new Monster(MonsterList.DRAGGOG);

  const drawBattleGround = () => {
    battleGroundSprite.draw();

    emby.drawAllyMonster();
    draggo.drawEnemyMonster();
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
