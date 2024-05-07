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
  GROUND = "GROUND",
}
type typeCSS = {
  background: string;
  textColor: string;
};

export const MonsterbaseTypeCSS: Record<MonsterBaseType, typeCSS> = {
  FIRE: {
    background: "#EA7A3C",
    textColor: "white",
  },
  WATER: {
    background: "#539AE2",
    textColor: "white",
  },
  GRASS: {
    background: "#71C558",
    textColor: "white",
  },
  NORMAL: {
    background: "#00FFFFF",
    textColor: "black",
  },
  GROUND: {
    background: "#CC9F4F",
    textColor: "black",
  },
};

export const MoveDetailsJSON: Record<MoveList, MonsterMove> = {
  TACKLE: {
    name: "Tackle",
    type: MonsterBaseType.GROUND,
    rawDamage: 10,
    frontAnimation: null,
    backAnimation: null,
    spriteFames: 4,
  },
  CUT: {
    name: "Cut",
    type: MonsterBaseType.WATER,
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
