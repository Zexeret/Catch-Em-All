import {
  MovementKeyValues,
  addMovement,
  removeMovement,
} from "../utils/movementUtils";

export const startEventListeners = () => {
  window.addEventListener("keydown", (event) => {
    switch (event.key) {
      case "w":
      case "ArrowUp":
        addMovement(MovementKeyValues.UP);
        break;
      case "a":
      case "ArrowLeft":
        addMovement(MovementKeyValues.LEFT);
        break;
      case "s":
      case "ArrowDown":
        addMovement(MovementKeyValues.DOWN);
        break;
      case "d":
      case "ArrowRight":
        addMovement(MovementKeyValues.RIGHT);
        break;
    }
  });

  window.addEventListener("keyup", (event) => {
    switch (event.key) {
      case "w":
      case "ArrowUp":
        removeMovement(MovementKeyValues.UP);
        break;
      case "a":
      case "ArrowLeft":
        removeMovement(MovementKeyValues.LEFT);
        break;
      case "s":
      case "ArrowDown":
        removeMovement(MovementKeyValues.DOWN);
        break;
      case "d":
      case "ArrowRight":
        removeMovement(MovementKeyValues.RIGHT);
        break;
    }
  });
};
