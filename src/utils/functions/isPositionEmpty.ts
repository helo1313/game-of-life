import Creature from "../../classes/creatures/Creature";
import Position from "../Interfaces/positionInterface";
import Grid from "../types/entitiesType";

export const isPositionEmpty: <T>(
  position: Position,
  grid: Grid<T>
) => boolean = (position, grid) => {
  return grid[position.y][position.x] === null;
};
