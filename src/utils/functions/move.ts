import Creature from "../../classes/creatures/Creature";
import Position from "../Interfaces/positionInterface";
import Grid from "../types/entitiesType";

export const move: (
  from: Position,
  to: Position,
  grid: Grid<Creature>
) => void = (from, to, grid) => {
  if (grid[to.y][to.x] !== grid[from.y][from.x]) {
    grid[to.y][to.x] = grid[from.y][from.x];
    grid[from.y][from.x] = null;
  }
};
