import { MovementKeyValues } from "../utils/movementUtils";
import { canvasCtx } from "./canvas";

export type Coordinates = {
  x: number;
  y: number;
};

type PlayerSpriteConfig = {
  frameCount: number;
  currentFrameNumber?: number;
  elapsed?: number;
  sprites?: Record<MovementKeyValues, HTMLImageElement>;
  moving?: boolean;
  lastDirection?: MovementKeyValues;
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
      case MovementKeyValues.NONE:
        break;
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
  playerConfig?: PlayerSpriteConfig;
  velocity?: number;
};
export class Sprite extends BaseSprite {
  image: HTMLImageElement;
  playerConfig: PlayerSpriteConfig;
  width: number;
  height: number;

  constructor({
    image,
    position,
    velocity = 0,
    playerConfig = { frameCount: 1 },
  }: SpriteConstructorPropsType) {
    super({ position, velocity });
    this.image = image;
    this.playerConfig = {
      ...playerConfig,
      currentFrameNumber: 0,
      elapsed: 0,
      moving: false,
      lastDirection: MovementKeyValues.DOWN,
    };

    this.image.onload = () => {
      this.width = image.width / playerConfig.frameCount;
      this.height = image.height;
    };
  }

  draw() {
    this.image = this.playerConfig.sprites
      ? this.playerConfig.sprites[this.playerConfig.lastDirection]
      : this.image;

    canvasCtx.drawImage(
      this.image,
      this.playerConfig.moving
        ? this.playerConfig.currentFrameNumber * this.width
        : 0,
      0,
      this.width,
      this.height,
      this.position.x,
      this.position.y,
      this.width,
      this.height
    );

    if (!this.playerConfig.moving) return;

    if (this.playerConfig.frameCount > 1) this.playerConfig.elapsed++;

    if (this.playerConfig.elapsed % 6 === 0) {
      this.playerConfig.currentFrameNumber =
        (this.playerConfig.currentFrameNumber + 1) %
        this.playerConfig.frameCount;
    }
  }

  clone() {
    return new Sprite({
      image: this.image,
      position: this.position,
      velocity: this.velocity,
      playerConfig: this.playerConfig,
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
