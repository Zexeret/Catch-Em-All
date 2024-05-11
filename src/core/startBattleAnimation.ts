import { Monster, MonsterList, Move, isHTMLElement } from "../monster";
import { AnimateOnCanvas } from "../utils/animate";
import { FPS } from "../utils/constants";
import { fadeOut } from "./canvas";
import { getSprites, loadSprites } from "./loadSprite";
import { resumeTownAnimation } from "./startTownAnimation";

let attackButtonFocusIndex = 0;
let abortSignal: AbortSignal;
let performAttack;

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

  const handleAttackFocus = (event: KeyboardEvent) => {
    switch (event.code) {
      case "KeyA":
      case "ArrowLeft":
        chaangeAttackButtonFocus({ change: -1 });
        break;
      case "KeyD":
      case "ArrowRight":
        chaangeAttackButtonFocus({ change: 1 });
        break;
      case "Enter":
      case "Space":
        performAttack(emby, draggo, attackButtonFocusIndex);
        break;
    }
  };

  const drawBattleGround = () => {
    battleGroundSprite.draw();

    draggo.drawEnemyMonster();
    Move.MoveSprites.forEach((move) => move.draw());
    emby.drawAllyMonster();
  };

  window.addEventListener("keydown", handleAttackFocus, {
    signal: abortSignal,
  });
  showBattleInterfaces(emby, draggo);

  const battleGroundAnimationController = new AnimateOnCanvas(
    FPS,
    drawBattleGround
  );

  const performMoveAttack = (
    attacker: Monster,
    receipent: Monster,
    attackIndex: number
  ) => {
    if (Monster.performAttack(attacker, receipent, attackIndex)) {
      controller.abort();
      setTimeout(() => {
        battleGroundAnimationController.stopAnimationRender();
        fadeOut({
          callbackFun: () => {
            resumeTownAnimation();
            hideBattleInterfaces();
          },
        });
      }, 3000);
    }
  };
  performAttack = performMoveAttack;
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
        performAttack(draggo, emby, index);
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

  const greenHealthBars = document.querySelectorAll(
    "#healthBar .greenHealthBar"
  );
  isHTMLElement(greenHealthBars[0])
    ? (greenHealthBars[0].style.width = "100%")
    : null;
  isHTMLElement(greenHealthBars[1])
    ? (greenHealthBars[1].style.width = "100%")
    : null;
};
