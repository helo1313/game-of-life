import { MAP_CELL_AMOUNT } from "../../utils/constans/gameSettings";
import { getDirection } from "../../utils/functions/getDirection";
import Creature from "./Creature";

export default abstract class Animal extends Creature {
  move() {
    const moveDirection = getDirection();

    this.x += moveDirection.x;
    if (this.x > MAP_CELL_AMOUNT - 1) {
      this.x = MAP_CELL_AMOUNT - 1;
    } else if (this.x < 0) {
      this.x = 0;
    }

    this.y += moveDirection.y;
    if (this.y > MAP_CELL_AMOUNT - 1) {
      this.y = MAP_CELL_AMOUNT - 1;
    } else if (this.y < 0) {
      this.y = 0;
    }
  }

  interact(creatures: Creature[]): {
    result: "attack" | "procreate" | "none";
    newCreature?: Creature;
  } {
    let interactionResult: {
      result: "attack" | "procreate" | "none";
      newCreature?: Creature;
    } = { result: "none" };

    const otherCreatures = creatures.filter((creature) => {
      return (
        this !== creature &&
        creature.isAlive &&
        this.x === creature.x &&
        this.y === creature.y
      );
    });

    if (otherCreatures.length === 0) {
      return interactionResult;
    }

    if (otherCreatures)
      otherCreatures.forEach((creature) => {
        if (this.name === creature.name) {
          const procreateResult = this.procreate(creature, creatures);

          if (procreateResult.didSuccess) {
            interactionResult = {
              result: "procreate",
              newCreature: procreateResult.newCreature!,
            };
          } else {
            interactionResult = {
              result: "none",
            };
          }
        } else {
          this.attack(creature);
          interactionResult = {
            result: "attack",
          };
        }
      });

    return interactionResult;
  }

  attack(otherCreature: Creature) {
    if (!otherCreature.isAlive) {
      return;
    }

    if (this.strength > otherCreature.strength) {
      otherCreature.isAlive = false;
    } else {
      this.isAlive = false;
    }
  }
}
