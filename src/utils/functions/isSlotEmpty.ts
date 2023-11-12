import Creature from "../../classes/creatures/Creature";
import Position from "../Interfaces/positionInterface";

export const isSlotEmpty: (
  position: Position,
  creatures: Creature[]
) => boolean = (position, creatures) => {
  let result = true;

  creatures.forEach((creature) => {
    if (
      creature.isAlive &&
      creature.position.x === position.x &&
      creature.position.y === position.y
    ) {
      result = false;
    }
  });

  return result;
};
