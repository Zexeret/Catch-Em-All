// All the src are w.r.t index.html file

import { CANVAS_HEIGHT, CANVAS_WIDTH, WALK_VELOCITY } from "../utils/constants";
import { Coordinates, Sprite } from "./classes";

type LoadSpritesReturnType = {
  townMap: Sprite;
  playerDownSprite: Sprite;
  foreGroundSprite: Sprite;
};

export const loadSprites = (map_offset: Coordinates): LoadSpritesReturnType => {
  const mapImg = new Image();
  mapImg.src = "../src/assets/images/Pellet Town.png";

  const playerDownImg = new Image();
  playerDownImg.src = "../src/assets/images/playerDown.png";

  const playerUpImg = new Image();
  playerUpImg.src = "../src/assets/images/playerUp.png";

  const playerLeftImg = new Image();
  playerLeftImg.src = "../src/assets/images/playerLeft.png";

  const playerRightImg = new Image();
  playerRightImg.src = "../src/assets/images/playerRight.png";

  const foregroundImg = new Image();
  foregroundImg.src = "../src/assets/images/foreground.png";

  const townMap = new Sprite({
    image: mapImg,
    position: map_offset,
    velocity: WALK_VELOCITY,
  });
  const playerDownSprite = new Sprite({
    image: playerDownImg,
    position: {
      x: CANVAS_WIDTH / 2 - playerDownImg.width / 4 / 2,
      y: CANVAS_HEIGHT / 2 - playerDownImg.height / 4 / 2,
    },
    playerConfig: {
      frameCount: 4,
      sprites: {
        UP: playerUpImg,
        DOWN: playerDownImg,
        LEFT: playerLeftImg,
        RIGHT: playerRightImg,
        "": playerDownImg,
      },
    },
    velocity: WALK_VELOCITY,
  });
  const foreGroundSprite = new Sprite({
    image: foregroundImg,
    position: map_offset,
    velocity: WALK_VELOCITY,
  });

  return {
    townMap,
    playerDownSprite,
    foreGroundSprite,
  };
};
