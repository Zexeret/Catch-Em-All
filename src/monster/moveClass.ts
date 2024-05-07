import { MonsterType } from "./monsterDetails";
import { MonsterMove } from "./moveDetails";

export class Move {
  name: string;
  type: MonsterType;
  rawDamage: number;
  frontAnimation: HTMLImageElement;
  backAnimation: HTMLImageElement;
  spriteFrames: number;

  constructor(move: MonsterMove) {
    this.name = move.name;
    this.type = move.type;
    this.rawDamage = move.rawDamage;

    this.frontAnimation = new Image();
    this.frontAnimation.src = move.frontAnimation;

    this.backAnimation = new Image();
    this.backAnimation.src = move.backAnimation;

    this.spriteFrames = move.spriteFames;
  }

  draw() {}
}
