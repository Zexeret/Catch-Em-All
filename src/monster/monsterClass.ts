import {
  Coordinates,
  canvasCtx,
  hideDialogueContainer,
  showDialogueContainer,
} from "../core";
import {
  ALLY_BATTLE_POSITION,
  ENEMY_BATTLE_POSITION,
} from "../utils/constants";
import { MonsterDetailsJSON, MonsterList } from "./monsterDetails";
import { Move } from "./moveClass";
import { MonsterbaseTypeCSS, MoveDetailsJSON } from "./moveDetails";

export const isHTMLElement = (source: any): source is HTMLElement => {
  return source.nodeName && source.nodeType === 1;
};

export abstract class battleStats {
  protected battleHealth: number;
  isAlly: boolean;
  constructor() {}

  abstract resetStats(): void;
}

export class Monster extends battleStats {
  name: string;
  health: number;
  initialMoves: Array<Move>;
  frontAnimation: HTMLImageElement = null;
  backAnimation: HTMLImageElement = null;
  spriteFrames: number;
  #currentFrameNumber: number;
  #elasped: number;
  animate: boolean;
  #attackBarColored: boolean = false;
  position: Coordinates;
  opacity: number;

  constructor(monsterName: MonsterList) {
    super();
    const monster = MonsterDetailsJSON[monsterName];

    this.name = monster.name;
    this.health = monster.health;
    this.battleHealth = monster.health;
    this.initialMoves = [];
    monster.initialMoves.forEach((move) => {
      this.initialMoves.push(new Move(MoveDetailsJSON[move]));
    });

    if (monster.frontAnimation) {
      this.frontAnimation = new Image();
      this.frontAnimation.src = monster.frontAnimation;
    }

    if (monster.backAnimation) {
      this.backAnimation = new Image();
      this.backAnimation.src = monster.backAnimation;
    }

    this.spriteFrames = monster.spriteFrames;
    this.#currentFrameNumber = 0;
    this.#elasped = 0;

    this.animate = true;
    this.isAlly = true;

    this.position = ALLY_BATTLE_POSITION;

    this.opacity = 1;
  }

  drawEnemyMonster() {
    this.#draw(true);
    this.isAlly = false;
    this.position = ENEMY_BATTLE_POSITION;
  }

  drawAllyMonster() {
    this.#draw(false);

    // This is here so that we do not call colorAttackBar
    // function over and over as draw fn is getting called
    // non stop
    if (!this.#attackBarColored) {
      this.#colorAttackBar();
      this.#attackBarColored = true;
    }
  }

  resetStats(): void {
    this.battleHealth = this.health;
  }

  #draw(enemy: boolean) {
    let image = enemy ? this.frontAnimation : this.backAnimation;
    let singleFrameWidth = image.width / this.spriteFrames;

    canvasCtx.save();
    canvasCtx.globalAlpha = this.opacity;
    canvasCtx.drawImage(
      image,
      this.animate ? this.#currentFrameNumber * singleFrameWidth : 0,
      0,
      singleFrameWidth,
      image.height,
      this.position.x,
      this.position.y,
      singleFrameWidth,
      image.height
    );
    canvasCtx.restore();

    if (this.spriteFrames > 1) this.#elasped++;

    if (this.#elasped % 10 === 0) {
      this.#currentFrameNumber =
        (this.#currentFrameNumber + 1) % this.spriteFrames;
    }
  }

  #colorAttackBar() {
    const attackbars = document.querySelectorAll(".attackBar button");
    const typeSpan = document.querySelectorAll(".attackTypeSpanDiv span");

    attackbars.forEach((attackButton, index) => {
      if (isHTMLElement(attackButton)) {
        if (this.initialMoves.length > index) {
          const move = this.initialMoves[index];
          const moveName = move.name;
          const moveTypeCSS = MonsterbaseTypeCSS[move.type];
          const moveTypeSpan = typeSpan[index];

          attackButton.style.background = moveTypeCSS.background;
          attackButton.style.color = moveTypeCSS.textColor;
          attackButton.innerHTML = moveName;

          //populate type in <span> tag
          moveTypeSpan.innerHTML = move.type;
          if (isHTMLElement(moveTypeSpan)) {
            moveTypeSpan.style.color = `${moveTypeCSS.textColor}33`;
          }
        }
      } else {
        throw new Error("Not an HTML Element");
      }
    });
  }
  private async attack(
    attacker: Monster,
    receipent: Monster,
    attackMove: Move
  ): Promise<boolean> {
    const animateMove = this.isAlly
      ? attackMove.animateAllyMove
      : attackMove.animateEnemyMove;
    const healthBar = document.querySelectorAll("#healthBar .greenHealthBar")[
      this.isAlly ? 0 : 1
    ];
    const heathStat = document.querySelector(
      `#${this.isAlly ? "enemyMonsterName" : "allyMonsterName"} ~ #healthStats`
    );
    isHTMLElement(heathStat)
      ? (heathStat.innerHTML = `${receipent.battleHealth}/${receipent.health}`)
      : null;

    if (animateMove) {
      await animateMove({
        attacker: attacker,
        receipent: receipent,
        move: attackMove,
      });

      if (isHTMLElement(healthBar)) {
        receipent.battleHealth -= attackMove.rawDamage;
        if (receipent.battleHealth <= 0) {
          isHTMLElement(heathStat)
            ? (heathStat.innerHTML = `0/${receipent.health}`)
            : null;
          healthBar.style.width = `0%`;
          return true;
        }

        isHTMLElement(heathStat)
          ? (heathStat.innerHTML = `${receipent.battleHealth}/${receipent.health}`)
          : null;
        healthBar.style.width = `${
          (receipent.battleHealth / receipent.health) * 100
        }%`;
      }
    } else {
      throw new Error(
        `${
          attackMove.name
        } does not have a animation function when performed by ${
          this.isAlly ? "Ally" : "Enemy"
        }.`
      );
    }

    return false;
  }

  static async performAttack(
    attacker: Monster,
    receipent: Monster,
    attackIndex: number
  ) {
    return new Promise(async (resolve, reject) => {
      const allyTotalMoves = attacker.initialMoves.length;
      if (allyTotalMoves < attackIndex + 1) {
        console.log(
          attacker.name,
          "does not have",
          attackIndex + 1,
          "attack yet"
        );
        return;
      }

      const attackMove = attacker.initialMoves[attackIndex];
      showDialogueContainer(`${attacker.name} performed ${attackMove.name}`);
      const enemyDefeated = attacker.attack(attacker, receipent, attackMove);
      console.log(receipent.name, "health now is ", receipent.battleHealth);

      setTimeout(() => {
        hideDialogueContainer();

        resolve(enemyDefeated);
      }, 3000);
    });
  }
}
