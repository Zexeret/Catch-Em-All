import { MonsterType } from "./monsterDetails";

export type MonsterMove = {
  name: string;
  type: MonsterType;
  rawDamage: number;
  frontAnimation: string | null;
  backAnimation: string | null;
  spriteFames: number;
};

export const MoveDetailsJSON: Record<MoveList, MonsterMove> = {
  TACKLE: {
    name: "Tackle",
    type: MonsterType.NORMAL,
    rawDamage: 10,
    frontAnimation: null,
    backAnimation: null,
    spriteFames: 4,
  },
  CUT: {
    name: "Cut",
    type: MonsterType.NORMAL,
    rawDamage: 15,
    frontAnimation: null,
    backAnimation: null,
    spriteFames: 4,
  },
  FIREBALL: {
    name: "Fireball",
    type: MonsterType.FIRE,
    rawDamage: 30,
    frontAnimation: "../src/assets/images/fireball.png",
    backAnimation: null,
    spriteFames: 4,
  },
};

export enum MoveList {
  TACKLE = "TACKLE",
  CUT = "CUT",
  FIREBALL = "FIREBALL",
}
