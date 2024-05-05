import { CANVAS_HEIGHT, CANVAS_WIDTH } from "../utils/constants";
import { MovementKeyValues } from "../utils/movementUtils";
import { canvasCtx } from "./initiateCanvas";

export type Coordinates = {
  x: number;
  y: number;
};

type PlayerSpriteConfig = {
  frameCount: number;
};

type BaseSpritePropsType = {
  position: Coordinates;
  velocity: number;
};
export class BaseSprite {
  position: Coordinates;
  velocity: number;

  constructor({ position, velocity }: BaseSpritePropsType) {
    this.position = { x: position.x, y: position.y };
    this.velocity = velocity;
  }

  move(dir: MovementKeyValues) {
    switch (dir) {
      case MovementKeyValues.UP:
        this.#moveUp();
        break;
      case MovementKeyValues.DOWN:
        this.#moveDown();
        break;
      case MovementKeyValues.LEFT:
        this.#moveLeft();
        break;
      case MovementKeyValues.RIGHT:
        this.#moveRight();
        break;
    }
  }

  #moveUp() {
    this.position.y += this.velocity;
  }
  #moveDown() {
    this.position.y -= this.velocity;
  }
  #moveLeft() {
    this.position.x += this.velocity;
  }
  #moveRight() {
    this.position.x -= this.velocity;
  }
}

type SpriteConstructorPropsType = {
  image: HTMLImageElement;
  position: Coordinates;
  frame?: PlayerSpriteConfig;
  velocity: number;
};
export class Sprite extends BaseSprite {
  image: HTMLImageElement;
  frame: PlayerSpriteConfig;
  width: number;
  height: number;

  constructor({
    image,
    position,
    velocity,
    frame = { frameCount: 1 },
  }: SpriteConstructorPropsType) {
    super({ position, velocity });
    this.image = image;
    this.frame = frame;

    this.image.onload = () => {
      this.width = image.width / frame.frameCount;
      this.height = image.height;
    };
  }

  draw() {
    canvasCtx.drawImage(
      this.image,
      0,
      0,
      this.width,
      this.height,
      this.position.x,
      this.position.y,
      this.width,
      this.height
    );
  }

  clone() {
    return new Sprite({
      image: this.image,
      position: this.position,
      velocity: this.velocity,
      frame: this.frame,
    });
  }
}

type BoundaryConstructorPropsType = {
  position: Coordinates;
  velocity: number;
};
export class Boundary extends BaseSprite {
  static boundaryWidth = 48; // 12px tiles, zoomed in by 4X
  static boundaryHeight = 48;
  position: Coordinates;
  constructor({ position, velocity }: BoundaryConstructorPropsType) {
    super({ position, velocity });
  }

  draw() {
    canvasCtx.fillStyle = "red";
    canvasCtx.fillRect(
      this.position.x,
      this.position.y,
      Boundary.boundaryWidth,
      Boundary.boundaryHeight
    );
  }

  clone() {
    return new Boundary({
      position: this.position,
      velocity: this.velocity,
    });
  }
}
