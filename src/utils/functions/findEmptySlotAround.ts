import { off } from "process";
import Creature from "../../classes/creatures/Creature";
import { isSlotEmpty } from "./isSlotEmpty";
import { isInBound } from "./isInBound";
import Position from "../Interfaces/positionInterface";
import Grid from "../types/entitiesType";
import { isPositionEmpty } from "./isPositionEmpty";

export const findEmptySlotAround: (
  position: Position,
  grid: Grid<Creature>
) => { didSuccess: boolean; newEntitiyPosition?: Position } = (
  position,
  grid
) => {
  let offsets = [
    { offsetX: 1, offsetY: 1 },
    { offsetX: 1, offsetY: 0 },
    { offsetX: 1, offsetY: -1 },
    { offsetX: 0, offsetY: 1 },
    { offsetX: 0, offsetY: 0 },
    { offsetX: 0, offsetY: -1 },
    { offsetX: -1, offsetY: 1 },
    { offsetX: -1, offsetY: 0 },
    { offsetX: -1, offsetY: -1 },
  ];

  while (offsets.length > 0) {
    const index = Math.floor(Math.random() * offsets.length);

    const checkPosition = {
      x: offsets[index].offsetX + position.x,
      y: offsets[index].offsetY + position.y,
    };

    if (!isInBound(checkPosition)) {
      offsets = offsets.filter((_, arrayIndex) => {
        return index !== arrayIndex;
      });
      continue;
    }

    const isEmpty = isPositionEmpty(checkPosition, grid);
    if (isEmpty) {
      return { didSuccess: true, newEntitiyPosition: checkPosition };
    } else {
      offsets = offsets.filter((_, arrayIndex) => {
        return index !== arrayIndex;
      });
    }
  }

  return { didSuccess: false };
};
