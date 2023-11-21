import Position from "../Interfaces/positionInterface";
import { MAP_CELL_AMOUNT } from "../constans/gameSettings";

export const isInBound: (position: Position) => boolean = (position) => {
  return (
    position.x >= 0 &&
    position.x < MAP_CELL_AMOUNT - 1 &&
    position.y >= 0 &&
    position.y < MAP_CELL_AMOUNT - 1
  );
};
