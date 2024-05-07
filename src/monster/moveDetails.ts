export type MonsterMove = {
  name: string;
  type?: MonsterBaseType;
  rawDamage: number;
  frontAnimation: string | null;
  backAnimation: string | null;
  spriteFames: number;
};

export enum MonsterBaseType {
  FIRE = "FIRE",
  WATER = "WATER",
  GRASS = "GRASS",
  NORMAL = "NORMAL",
}

export const MoveDetailsJSON: Record<MoveList, MonsterMove> = {
  TACKLE: {
    name: "Tackle",
    type: MonsterBaseType.NORMAL,
    rawDamage: 10,
    frontAnimation: null,
    backAnimation: null,
    spriteFames: 4,
  },
  CUT: {
    name: "Cut",
    type: MonsterBaseType.NORMAL,
    rawDamage: 15,
    frontAnimation: null,
    backAnimation: null,
    spriteFames: 4,
  },
  FIREBALL: {
    name: "Fireball",
    type: MonsterBaseType.FIRE,
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
