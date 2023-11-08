import Creature from "../../classes/creatures/Creature";

export const isSlotEmpty: (
  x: number,
  y: number,
  creatures: Creature[]
) => boolean = (x, y, creatures) => {
  creatures.forEach((creature) => {
    if ((creature.isAlive && creature.x === x, creature.y === y)) {
      return false;
    }
  });

  return true;
};
