export enum MovementKeyValues {
  LEFT = "LEFT",
  RIGHT = "RIGHT",
  UP = "UP",
  DOWN = "DOWN",
  NONE = "",
}

export const lastPressedMovementKey: Array<MovementKeyValues> = [
  MovementKeyValues.NONE,
];

export const addMovement = (direction: MovementKeyValues) => {
  const index = lastPressedMovementKey.findIndex((dir) => dir === direction);
  if (index === -1) lastPressedMovementKey.push(direction);
};

export const removeMovement = (direction: MovementKeyValues) => {
  lastPressedMovementKey.splice(
    lastPressedMovementKey.findIndex((dir) => dir === direction),
    1
  );
};
