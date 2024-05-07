import { canvasCtx } from "../core";
import {
  ALLY_BATTLE_POSITION,
  ENEMY_BATTLE_POSITION,
} from "../utils/constants";
import { MonsterDetailsJSON, MonsterList } from "./monsterDetails";
import { Move } from "./moveClass";
import { MoveDetailsJSON } from "./moveDetails";

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
}
