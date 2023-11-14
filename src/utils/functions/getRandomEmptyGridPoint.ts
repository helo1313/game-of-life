import { isTemplateMiddleOrTemplateTail } from "typescript";
import Position from "../Interfaces/positionInterface";
import Grid from "../types/entitiesType";
import { MAP_CELL_AMOUNT } from "../constans/gameSettings";
import { isPositionEmpty } from "./isPositionEmpty";

const MAX_POSITION_DRAWS = 5;

export const getRandomEmptyGridPoint: <T>(grid: Grid<T>) => {
  didSuccess: boolean;
  position?: Position;
} = (grid) => {
  let positionCounter = 0;

  while (positionCounter <= MAX_POSITION_DRAWS) {
    const x = Math.floor(Math.random() * MAP_CELL_AMOUNT);
    const y = Math.floor(Math.random() * MAP_CELL_AMOUNT);
    const position = { x, y };

    if (isPositionEmpty(position, grid)) {
      return { didSuccess: true, position: position };
    }
  }

  return { didSuccess: false };
};
