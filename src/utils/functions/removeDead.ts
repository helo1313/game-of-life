import Grid from "../types/entitiesType";
import Creature from "../../classes/creatures/Creature";

export const removeDead: (grid: Grid<Creature>) => void = (grid) => {
  grid.forEach((gridRow, indexY) => {
    gridRow.forEach((element, indexX) => {
      if (!element?.isAlive) {
        element = null;
      }
    });
  });
};
