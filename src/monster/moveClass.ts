import { Coordinates, canvasCtx } from "../core";
import {
  ALLY_BATTLE_POSITION,
  ENEMY_BATTLE_POSITION,
} from "../utils/constants";
import {
  MonsterBaseType,
  MonsterMove,
  animateFunctionProps,
} from "./moveDetails";

var TO_RADIANS = Math.PI / 180;

export class Move {
  name: string;
  type: MonsterBaseType;
  rawDamage: number;
  frontAnimation: HTMLImageElement = null;
  backAnimation: HTMLImageElement = null;
  spriteFrames: number;
  opacity: number;
  position: Coordinates;
  animateAllyMove: (props: animateFunctionProps) => Promise<string>;
  animateEnemyMove: (props: animateFunctionProps) => Promise<string>;

  //required when drawing move sprites
  #image: HTMLImageElement = null;

  //required for animation
  #currentFrameNumber: number;
  #elasped: number;

  // This array will called in our drawCanvas fun to check
  // and draw the move sprites
  static MoveSprites: Array<Move> = [];

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

    this.position = ALLY_BATTLE_POSITION;
    this.opacity = 1;

    this.animateAllyMove = move.animateAllyMove
      ? (props) =>
          new Promise((resolve) => {
            let index = -1;
            // adding sprite to draw on canvas
            if (this.frontAnimation) {
              index = Move.MoveSprites.push(props.move) - 1;
              this.#image = this.frontAnimation;
            }

            this.position = { ...ALLY_BATTLE_POSITION };

            move.animateAllyMove({
              ...props,
              onComplete: () => {
                // removing sprite so that it doesnt draw on canvas
                resolve("");
                if (index !== -1) Move.MoveSprites.splice(index, 1);
              },
            });
          })
      : null;
    this.animateEnemyMove = move.animateEnemyMove
      ? (props) =>
          new Promise((resolve) => {
            let index = -1;
            // adding sprite to draw on canvas
            if (this.backAnimation) {
              index = Move.MoveSprites.push(props.move) - 1;
              this.#image = this.backAnimation;
            }
            this.position = { ...ENEMY_BATTLE_POSITION };

            move.animateEnemyMove({
              ...props,
              onComplete: () => {
                // removing sprite so that it doesnt draw on canvas
                resolve("");
                if (index !== -1) Move.MoveSprites.splice(index, 1);
              },
            });
          })
      : null;

    this.#currentFrameNumber = 0;
    this.#elasped = 0;
  }

  draw() {
    let singleFrameWidth = this.#image.width / this.spriteFrames;

    canvasCtx.save();
    canvasCtx.globalAlpha = this.opacity;
    canvasCtx.drawImage(
      this.#image,
      this.#currentFrameNumber * singleFrameWidth,
      0,
      singleFrameWidth,
      this.#image.height,
      this.position.x,
      this.position.y,
      singleFrameWidth,

      this.#image.height
    );
    canvasCtx.restore();

    if (this.spriteFrames > 1) this.#elasped++;

    if (this.#elasped % 8 === 0) {
      this.#currentFrameNumber =
        (this.#currentFrameNumber + 1) % this.spriteFrames;
    }
  }
}
