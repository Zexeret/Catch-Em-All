import { MoveList } from "./moveDetails";

export enum MonsterType {
  FIRE = "FIRE",
  WATER = "WATER",
  GRASS = "GRASS",
  NORMAL = "NORMAL",
}

export type MonsterDetails = {
  name: string;
  frontAnimation: string;
  backAnimation: string;
  health: number;
  initialMoves: Array<MoveList>;
  spriteFrames: number;
};
export enum MonsterList {
  EMBERY = "EMBERY",
  DRAGGOG = "DRAGGOG",
}

export const MonsterDetailsJSON: Record<MonsterList, MonsterDetails> = {
  EMBERY: {
    name: "Embery",
    frontAnimation: null,
    backAnimation: "../src/assets/images/embySprite.png",
    health: 100,
    initialMoves: [MoveList.CUT, MoveList.TACKLE, MoveList.FIREBALL],
    spriteFrames: 4,
  },
  DRAGGOG: {
    name: "Draggog",
    frontAnimation: "../src/assets/images/draggleSprite.png",
    backAnimation: null,
    health: 60,
    initialMoves: [MoveList.CUT, MoveList.TACKLE],
    spriteFrames: 4,
  },
};
