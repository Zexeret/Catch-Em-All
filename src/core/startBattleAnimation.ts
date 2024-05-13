import { Monster, MonsterList, Move, isHTMLElement } from "../monster";
import { AnimateOnCanvas } from "../utils/animate";
import { FPS } from "../utils/constants";
import { fadeOut } from "./canvas";
import { getSprites, loadSprites } from "./loadSprite";
import { resumeTownAnimation } from "./startTownAnimation";

let attackButtonFocusIndex = 0;
let battleGroundAnimationController: AnimateOnCanvas;
let controller: AbortController;
let abortSignal: AbortSignal;
let attackAllowed: boolean;

export const showDialogueContainer = (message: string, timer: number = 0) => {
  return new Promise((resolve) => {
    const dialogueInterface = document.getElementById("dialogueContainer");
    dialogueInterface.style.zIndex = "1";
    dialogueInterface.innerHTML = message;

    const attackInterface = document.getElementById("attackInterface");
    attackInterface.classList.add("none-display");
    attackAllowed = false;

    setTimeout(() => {
      resolve("");
    }, timer);
  });
};

export const hideDialogueContainer = () => {
  const dialogueInterface = document.getElementById("dialogueContainer");
  dialogueInterface.style.zIndex = "0";
  dialogueInterface.innerHTML = "";

  const attackInterface = document.getElementById("attackInterface");
  attackInterface.classList.remove("none-display");
  attackAllowed = true;

  chaangeAttackButtonFocus({});
};

const getRandomAttackIndex = (attacker: Monster) => {
  const attackMoveLength = attacker.initialMoves.length;
  return Math.floor(Math.random() * attackMoveLength);
};

const performAllyAttack = async (
  attacker: Monster,
  receipent: Monster,
  attackIndex: number
) => {
  if (!attackAllowed) return;
  const enemyDefeated = await Monster.performAttack(
    attacker,
    receipent,
    attackIndex
  );

  if (enemyDefeated) {
    await showDialogueContainer(
      `${receipent.name} defeated ${receipent.name}!!!`,
      2000
    );
    await showDialogueContainer(`${receipent.name} fained.`, 2000);

    exitBattleAnimation();
  } else {
    console.log(enemyDefeated, "performing enemy attack");

    const enemyAttackIndex = getRandomAttackIndex(receipent);
    performEnemyAttack(receipent, attacker, enemyAttackIndex);
  }
};

const performEnemyAttack = async (
  attacker: Monster,
  receipent: Monster,
  attackIndex: number
) => {
  const allyDefeated = await Monster.performAttack(
    attacker,
    receipent,
    attackIndex
  );

  if (allyDefeated) {
    await showDialogueContainer(
      `${receipent.name} defeated ${receipent.name}!!!`,
      2000
    );
    await showDialogueContainer(`${receipent.name} fained.`, 2000);

    exitBattleAnimation();
  }
};

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

const exitBattleAnimation = () => {
  {
    controller.abort();
    battleGroundAnimationController.stopAnimationRender();
    setTimeout(() => {
      fadeOut({
        callbackFun: () => {
          resumeTownAnimation();
          hideBattleInterfaces();
        },
      });
    }, 0);
  }
};

export const startBattleAnimation = () => {
  attackButtonFocusIndex = 0;
  attackAllowed = true;
  const { battleGroundSprite } = getSprites();
  controller = new AbortController();
  abortSignal = controller.signal;

  const ally = new Monster(MonsterList.EMBERY);
  const enemy = new Monster(MonsterList.DRAGGOG);

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
        performAllyAttack(ally, enemy, attackButtonFocusIndex);
        break;
    }
  };

  const drawBattleGround = () => {
    battleGroundSprite.draw();

    enemy.drawEnemyMonster();
    Move.MoveSprites.forEach((move) => move.draw());
    ally.drawAllyMonster();
  };

  window.addEventListener("keydown", handleAttackFocus, {
    signal: abortSignal,
  });
  showBattleInterfaces(ally, enemy);

  battleGroundAnimationController = new AnimateOnCanvas(FPS, drawBattleGround);
};

const showBattleInterfaces = (ally: Monster, enemy: Monster) => {
  // to show attack interface
  const attackInterface = document.getElementById("attackInterface");
  attackInterface.classList.remove("none-display");

  // to show health Bars
  const healthBars = document.querySelectorAll("#healthBar");
  healthBars.forEach((bar) => {
    bar.classList.remove("none-display");
  });

  //show dialogueInterface
  const dialogueInterface = document.getElementById("dialogueContainer");
  dialogueInterface.classList.remove("none-display");

  //populate ally health Stats
  const allyHeathStat = document.querySelector(
    "#allyMonsterName ~ #healthStats"
  );
  isHTMLElement(allyHeathStat)
    ? (allyHeathStat.innerHTML = `${ally.health}/${ally.health}`)
    : null;
  document.getElementById("allyMonsterName").innerHTML = ally.name;

  //populate enemy health Stats
  const enemyHeathStat = document.querySelector(
    "#enemyMonsterName ~ #healthStats"
  );
  isHTMLElement(enemyHeathStat)
    ? (enemyHeathStat.innerHTML = `${enemy.health}/${enemy.health}`)
    : null;
  document.getElementById("enemyMonsterName").innerHTML = enemy.name;

  // Add event listener on attack buttons
  const attackButton = document.querySelectorAll(".attackBar button");
  attackButton.forEach((button, index) => {
    button.addEventListener(
      "click",
      () => {
        performAllyAttack(ally, enemy, index);
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
  chaangeAttackButtonFocus({ index: attackButtonFocusIndex });
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

  const dialogueInterface = document.getElementById("dialogueContainer");
  dialogueInterface.classList.add("none-display");
  dialogueInterface.style.zIndex = "0";
  dialogueInterface.innerHTML = "";
};
