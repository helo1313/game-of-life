import { isTemplateMiddleOrTemplateTail } from "typescript";
import Position from "../Interfaces/positionInterface";
import EntitiesGrid from "../types/entitiesType";
import { MAP_CELL_AMOUNT } from "../constans/gameSettings";

export const getRandomEmptyGridPoint: (Grid: EntitiesGrid) => Position = (
  entities
) => {
  const x = Math.floor(Math.random() * MAP_CELL_AMOUNT);
  const y = Math.floor(Math.random() * MAP_CELL_AMOUNT);
  return { x, y };
};
