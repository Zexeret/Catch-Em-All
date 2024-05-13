import { MoveList } from "./moveDetails";

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
    health: 150,
    initialMoves: [MoveList.WATERBALL, MoveList.TACKLE, MoveList.FIREBALL],
    spriteFrames: 4,
  },
  DRAGGOG: {
    name: "Draggog",
    frontAnimation: "../src/assets/images/draggleSprite.png",
    backAnimation: null,
    health: 200,
    initialMoves: [MoveList.FIREBALL, MoveList.CUT, MoveList.WINEWHIP],
    spriteFrames: 4,
  },
};
