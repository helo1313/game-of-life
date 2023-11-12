import Creature from "../../classes/creatures/Creature";

export const isSlotEmpty: (
  x: number,
  y: number,
  creatures: Creature[]
) => boolean = (x, y, creatures) => {
  let result = true;

  creatures.forEach((creature) => {
    if (creature.isAlive && creature.x === x && creature.y === y) {
      result = false;
    }
  });

  return result;
};
