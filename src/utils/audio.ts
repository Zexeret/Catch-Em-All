import { Howl } from "howler";

const audioMap = {
  map: new Howl({
    src: "../src/assets/audio/map.wav",
    html5: true,
    loop: true,
  }),
  initBattle: new Howl({
    src: "../src/assets/audio/initBattle.wav",
    html5: true,
    volume: 0.1,
  }),
  battle: new Howl({
    src: "../src/assets/audio/battle.mp3",
    html5: false,
    volume: 0.1,
    loop: true,
  }),
  initFireball: new Howl({
    src: "../src/assets/audio/initFireball.wav",
    html5: true,
    volume: 0.2,
  }),
  fireballHit: new Howl({
    src: "../src/assets/audio/fireballHit.wav",
    html5: true,
    volume: 0.2,
  }),
  tackleHit: new Howl({
    src: "../src/assets/audio/tackleHit.wav",
    html5: true,
    volume: 0.1,
  }),
  victory: new Howl({
    src: "../src/assets/audio/victory.wav",
    html5: true,
    volume: 1,
  }),
};

export default audioMap;
