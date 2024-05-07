import { Monster, MonsterList } from "../monster";
import { AnimateOnCanvas } from "../utils/animate";
import { FPS } from "../utils/constants";
import { fadeOut } from "./canvas";
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

  showBattleInterfaces();
  const battleGroundAnimationController = new AnimateOnCanvas(
    FPS,
    drawBattleGround
  );

  setTimeout(() => {
    battleGroundAnimationController.stopAnimationRender();
    fadeOut({
      callbackFun: () => {
        resumeTownAnimation();
        hideBattleInterfaces();
      },
    });
  }, 10000);
};

const showBattleInterfaces = () => {
  const attackInterface = document.getElementById("attackInterface");
  attackInterface.classList.remove("none-display");
};

const hideBattleInterfaces = () => {
  const attackInterface = document.getElementById("attackInterface");
  attackInterface.classList.add("none-display");
};
