import { MonsterBaseType, MonsterMove } from "./moveDetails";

export class Move {
  name: string;
  type: MonsterBaseType;
  rawDamage: number;
  frontAnimation: HTMLImageElement = null;
  backAnimation: HTMLImageElement = null;
  spriteFrames: number;

  constructor(move: MonsterMove) {
    this.name = move.name;
    this.type = move.type;
    this.rawDamage = move.rawDamage;

    if (move.frontAnimation) {
      this.frontAnimation = new Image();
      this.frontAnimation.src = move.frontAnimation;
    }

    if (move.backAnimation) {
      this.backAnimation = new Image();
      this.backAnimation.src = move.backAnimation;
    }

    this.spriteFrames = move.spriteFames;
  }

  draw() {}
}
