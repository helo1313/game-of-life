import { off } from "process";
import Creature from "../../classes/creatures/Creature";
import { isSlotEmpty } from "./isSlotEmpty";

export const findEmptySlotAround: (
  x: number,
  y: number,
  creatures: Creature[]
) => { didSuccess: boolean; x?: number; y?: number } = (x, y, creatures) => {
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

    const checkX = offsets[index].offsetX + x;
    const checkY = offsets[index].offsetY + y;

    const isEmpty = isSlotEmpty(checkX, checkY, creatures);
    if (isEmpty) {
      return { didSuccess: true, x: checkX, y: checkY };
    } else {
      offsets = offsets.filter((_, arrayIndex) => {
        return index !== arrayIndex;
      });
    }
  }

  return { didSuccess: false };
};
