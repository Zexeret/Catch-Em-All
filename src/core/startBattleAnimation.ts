import { Monster, MonsterList, isHTMLElement } from "../monster";
import { AnimateOnCanvas } from "../utils/animate";
import { FPS } from "../utils/constants";
import { fadeOut } from "./canvas";
import { getSprites, loadSprites } from "./loadSprite";
import { resumeTownAnimation } from "./startTownAnimation";

let attackButtonFocusIndex = 0;
let abortSignal: AbortSignal;

const chaangeAttackButtonFocus = ({
  change,
  index = 0,
}: {
  change?: -1 | 1 | 0;
  index?: number;
}) => {
  attackButtonFocusIndex = change
    ? (4 + attackButtonFocusIndex + change) % 4
    : index;

  const attackBars = document.querySelectorAll(".attackBar");
  attackBars.forEach((bar, index) => {
    if (isHTMLElement(bar)) {
      bar.setAttribute("tabindex", "0");
      bar.blur();
      if (attackButtonFocusIndex === index) {
        bar.focus();
      }
    }
  });
};

export const startBattleAnimation = () => {
  attackButtonFocusIndex = 0;
  const { battleGroundSprite } = getSprites();
  const controller = new AbortController();
  abortSignal = controller.signal;

  const emby = new Monster(MonsterList.EMBERY);
  const draggo = new Monster(MonsterList.DRAGGOG);

  console.log(emby);

  const handleAttackFocus = (event: KeyboardEvent) => {
    switch (event.key) {
      case "a":
      case "ArrowLeft":
        chaangeAttackButtonFocus({ change: -1 });
        break;
      case "d":
      case "ArrowRight":
        chaangeAttackButtonFocus({ change: 1 });
        break;
      case "Enter":
        Monster.performAttack(emby, draggo, attackButtonFocusIndex);
        break;
    }
  };

  const drawBattleGround = () => {
    battleGroundSprite.draw();

    emby.drawAllyMonster();
    draggo.drawEnemyMonster();
  };

  window.addEventListener("keydown", handleAttackFocus, {
    signal: abortSignal,
  });
  showBattleInterfaces(emby, draggo);

  const battleGroundAnimationController = new AnimateOnCanvas(
    FPS,
    drawBattleGround
  );

  // setTimeout(() => {
  //   battleGroundAnimationController.stopAnimationRender();
  //   controller.abort();
  //   fadeOut({
  //     callbackFun: () => {
  //       resumeTownAnimation();
  //       hideBattleInterfaces();
  //     },
  //   });
  // }, 5000);
};

const showBattleInterfaces = (emby: Monster, draggo: Monster) => {
  // to show attack interface
  const attackInterface = document.getElementById("attackInterface");
  attackInterface.classList.remove("none-display");

  // to show health Bars
  const healthBars = document.querySelectorAll("#healthBar");
  healthBars.forEach((bar) => {
    bar.classList.remove("none-display");
  });

  // Add event listener on attack buttons
  const attackButton = document.querySelectorAll(".attackBar button");
  attackButton.forEach((button, index) => {
    button.addEventListener(
      "click",
      () => {
        Monster.performAttack(emby, draggo, index);
      },
      { signal: abortSignal }
    );

    button.addEventListener(
      "mouseover",
      () => {
        chaangeAttackButtonFocus({ index: index });
      },
      { signal: abortSignal }
    );

    button.addEventListener(
      "focus",
      () => {
        chaangeAttackButtonFocus({ index: index });
      },
      { signal: abortSignal }
    );
  });

  // Sets initial focus on attack button
  chaangeAttackButtonFocus({ index: 2 });
};

const hideBattleInterfaces = () => {
  const attackInterface = document.getElementById("attackInterface");
  attackInterface.classList.add("none-display");

  const healthBars = document.querySelectorAll("#healthBar");
  healthBars.forEach((bar) => {
    bar.classList.add("none-display");
  });
};
