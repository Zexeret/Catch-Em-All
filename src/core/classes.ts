import { canvasCtx } from "./initiateCanvas";

export type Coordinates = {
  x: number;
  y: number;
};

export class Sprite {
  image: HTMLImageElement;
  position: Coordinates;
  constructor(image: HTMLImageElement, position: Coordinates) {
    this.image = image;
    this.position = position;
  }

  draw() {
    canvasCtx.drawImage(this.image, this.position.x, this.position.y);
  }

  moveUp(velocity: number) {
    this.position.y += velocity;
  }
  moveDown(velocity: number) {
    this.position.y -= velocity;
  }
  moveLeft(velocity: number) {
    this.position.x += velocity;
  }
  moveRight(velocity: number) {
    this.position.x -= velocity;
  }
}
