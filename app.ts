import {
  initiateCanvas,
  loadSprites,
  startBattleAnimation,
  startEventListeners,
  startTownAnimation,
} from "./src/core";
import { INITIAL_MAP_OFFSET } from "./src/utils/constants";

initiateCanvas();
loadSprites(INITIAL_MAP_OFFSET);
startEventListeners();
startTownAnimation();
