export class AnimateOnCanvas {
  stopAnimation = false;
  fps: number;
  drawCanvasFn: () => void;

  constructor(FPS: number, drawCanvas: () => void) {
    this.fps = FPS;
    this.drawCanvasFn = drawCanvas;
    this.startAnimationRender();
  }

  stopAnimationRender = () => {
    this.stopAnimation = true;
  };

  startAnimationRender = () => {
    this.#animateWithFPS(this.fps, this.drawCanvasFn);
  };

  #animateWithFPS = (FPS: number, drawCanvas: () => void) => {
    const fpsInterval = 1000 / FPS;
    let startTime = Date.now();
    let count = 0;
    let then = Date.now();
    this.stopAnimation = false;

    const animate = () => {
      let now = Date.now();
      let elapsed = now - then;
      count++;

      // if ((now - startTime) / 1000 > 1) {
      //   console.log("Your System's Frame Rate", count);
      //   startTime = now;
      //   count = 0;
      // }

      // if enough time has elapsed, draw the next frame
      if (elapsed > fpsInterval) {
        // Get ready for next frame by setting then=now, but...
        // Also, adjust for fpsInterval not being multiple of 16.67
        then = now - (elapsed % fpsInterval);

        //draw
        drawCanvas();
      }

      if (this.stopAnimation) return;
      window.requestAnimationFrame(animate);
    };

    animate();
  };
}
