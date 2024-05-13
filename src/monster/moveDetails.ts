import gsap from "gsap";
import { Monster } from "./monsterClass";
import { Move } from "./moveClass";
import {
  ALLY_BATTLE_POSITION,
  ENEMY_BATTLE_POSITION,
} from "../utils/constants";

export type animateFunctionProps = {
  attacker: Monster;
  receipent: Monster;
  move?: Move;
  onComplete?: () => void; // make sure in moveDetails you call onComplete or else it wont take effect
};
export type MonsterMove = {
  name: string;
  type?: MonsterBaseType;
  rawDamage: number;
  frontAnimation: string | null;
  backAnimation: string | null;
  spriteFames: number;
  animateAllyMove?: (props: animateFunctionProps) => void;
  animateEnemyMove?: (props: animateFunctionProps) => void;
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
    textColor: "#ffffff",
  },
  WATER: {
    background: "#539AE2",
    textColor: "#ffffff",
  },
  GRASS: {
    background: "#71C558",
    textColor: "#ffffff",
  },
  NORMAL: {
    background: "#00FFFFF",
    textColor: "#000000",
  },
  GROUND: {
    background: "#CC9F4F",
    textColor: "#000000",
  },
};

const hitAnimation = (monster: Monster): void => {
  gsap.to(monster.position, {
    x: monster.position.x + 10,
    yoyo: true,
    repeat: 5,
    duration: 0.08,
  });

  gsap.to(monster, {
    opacity: 0,
    repeat: 5,
    yoyo: true,
    duration: 0.08,
  });
};

export const MoveDetailsJSON: Record<MoveList, MonsterMove> = {
  WATERBALL: {
    name: "Water Ball",
    type: MonsterBaseType.WATER,
    rawDamage: 50,
    frontAnimation: null,
    backAnimation: null,
    spriteFames: 4,
    animateAllyMove: ({ attacker, receipent, onComplete }) => {
      const tl = gsap.timeline();
      tl.to(attacker.position, {
        x: attacker.position.x - 20,
      })
        .to(attacker.position, {
          x: attacker.position.x + 40,
          duration: 0.1,
          onComplete() {
            hitAnimation(receipent);
            onComplete();
          },
        })
        .to(attacker.position, {
          x: attacker.position.x,
        });
    },
    animateEnemyMove: ({ attacker, receipent, onComplete }) => {
      const tl = gsap.timeline();
      tl.to(attacker.position, {
        x: attacker.position.x + 20,
      })
        .to(attacker.position, {
          x: attacker.position.x - 40,
          duration: 0.1,
          onComplete() {
            hitAnimation(receipent);
            onComplete();
          },
        })
        .to(attacker.position, {
          x: attacker.position.x,
        });
    },
  },
  WINEWHIP: {
    name: "Wine Whip",
    type: MonsterBaseType.GRASS,
    rawDamage: 30,
    frontAnimation: null,
    backAnimation: null,
    spriteFames: 4,
    animateAllyMove: ({ attacker, receipent, onComplete }) => {
      const tl = gsap.timeline();
      tl.to(attacker.position, {
        x: attacker.position.x - 20,
      })
        .to(attacker.position, {
          x: attacker.position.x + 40,
          duration: 0.1,
          onComplete() {
            hitAnimation(receipent);
            onComplete();
          },
        })
        .to(attacker.position, {
          x: attacker.position.x,
        });
    },
    animateEnemyMove: ({ attacker, receipent, onComplete }) => {
      const tl = gsap.timeline();
      tl.to(attacker.position, {
        x: attacker.position.x + 20,
      })
        .to(attacker.position, {
          x: attacker.position.x - 40,
          duration: 0.1,
          onComplete() {
            hitAnimation(receipent);
            onComplete();
          },
        })
        .to(attacker.position, {
          x: attacker.position.x,
        });
    },
  },
  TACKLE: {
    name: "Tackle",
    type: MonsterBaseType.GROUND,
    rawDamage: 10,
    frontAnimation: null,
    backAnimation: null,
    spriteFames: 4,
    animateAllyMove: ({ attacker, receipent, onComplete }) => {
      const tl = gsap.timeline();
      tl.to(attacker.position, {
        x: attacker.position.x - 20,
      })
        .to(attacker.position, {
          x: attacker.position.x + 40,
          duration: 0.1,
          onComplete() {
            hitAnimation(receipent);
            onComplete();
          },
        })
        .to(attacker.position, {
          x: attacker.position.x,
        });
    },
    animateEnemyMove: ({ attacker, receipent, onComplete }) => {
      const tl = gsap.timeline();
      tl.to(attacker.position, {
        x: attacker.position.x + 20,
      })
        .to(attacker.position, {
          x: attacker.position.x - 40,
          duration: 0.1,
          onComplete() {
            hitAnimation(receipent);
            onComplete();
          },
        })
        .to(attacker.position, {
          x: attacker.position.x,
        });
    },
  },
  CUT: {
    name: "Cut",
    type: MonsterBaseType.NORMAL,
    rawDamage: 20,
    frontAnimation: null,
    backAnimation: null,
    spriteFames: 4,
    animateAllyMove: ({ attacker, receipent, onComplete }) => {
      const tl = gsap.timeline();
      tl.to(attacker.position, {
        x: attacker.position.x - 20,
      })
        .to(attacker.position, {
          x: attacker.position.x + 40,
          duration: 0.1,
          onComplete() {
            hitAnimation(receipent);
            onComplete();
          },
        })
        .to(attacker.position, {
          x: attacker.position.x,
        });
    },
    animateEnemyMove: ({ attacker, receipent, onComplete }) => {
      const tl = gsap.timeline();
      tl.to(attacker.position, {
        x: attacker.position.x + 20,
      })
        .to(attacker.position, {
          x: attacker.position.x - 40,
          duration: 0.1,
          onComplete() {
            hitAnimation(receipent);
            onComplete();
          },
        })
        .to(attacker.position, {
          x: attacker.position.x,
        });
    },
  },
  FIREBALL: {
    name: "Fireball",
    type: MonsterBaseType.FIRE,
    rawDamage: 40,
    frontAnimation: "../src/assets/images/fireball.png",
    backAnimation: "../src/assets/images/fireball.png",
    spriteFames: 4,
    animateAllyMove: ({ attacker, receipent, move, onComplete }) => {
      const tl = gsap.timeline();
      gsap.to(move.position, {
        x: ENEMY_BATTLE_POSITION.x + 5,
        y: ENEMY_BATTLE_POSITION.y + 5,
        duration: 0.6,
        onComplete() {
          hitAnimation(receipent);
          onComplete();
        },
      });
    },
    animateEnemyMove: ({ attacker, receipent, move, onComplete }) => {
      const tl = gsap.timeline();
      gsap.to(move.position, {
        x: ALLY_BATTLE_POSITION.x + 5,
        y: ALLY_BATTLE_POSITION.y + 5,
        duration: 0.6,
        onComplete() {
          hitAnimation(receipent);
          onComplete();
        },
      });
    },
  },
};

export enum MoveList {
  TACKLE = "TACKLE",
  CUT = "CUT",
  FIREBALL = "FIREBALL",
  WINEWHIP = "WINEWHIP",
  WATERBALL = "WATERBALL",
}
