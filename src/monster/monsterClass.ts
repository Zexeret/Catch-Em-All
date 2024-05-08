import { canvasCtx } from "../core";
import {
  ALLY_BATTLE_POSITION,
  ENEMY_BATTLE_POSITION,
} from "../utils/constants";
import { MonsterDetailsJSON, MonsterList } from "./monsterDetails";
import { Move } from "./moveClass";
import { MonsterbaseTypeCSS, MoveDetailsJSON } from "./moveDetails";

const isButton = (source: any): source is HTMLButtonElement => {
  return source.nodeName && source.nodeName === "BUTTON";
};

export class Monster {
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

  constructor(monsterName: MonsterList) {
    const monster = MonsterDetailsJSON[monsterName];

    this.name = monster.name;
    this.health = monster.health;
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
  }

  drawEnemyMonster() {
    this.#draw(true);
  }

  drawAllyMonster() {
    this.#draw(false);
    if (!this.#attackBarColored) {
      this.#colorAttackBar();
      this.#attackBarColored = true;
    }
  }

  #draw(enemy: boolean) {
    let image = enemy ? this.frontAnimation : this.backAnimation;
    let position = enemy ? ENEMY_BATTLE_POSITION : ALLY_BATTLE_POSITION;
    let singleFrameWidth = image.width / this.spriteFrames;
    canvasCtx.drawImage(
      image,
      this.animate ? this.#currentFrameNumber * singleFrameWidth : 0,
      0,
      singleFrameWidth,
      image.height,
      position.x,
      position.y,
      singleFrameWidth,
      image.height
    );

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
      if (isButton(attackButton)) {
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
        } else {
        }
      }
    });
  }
}
