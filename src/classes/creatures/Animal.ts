import { MAP_CELL_AMOUNT } from "../../utils/constans/gameSettings";
import { getDirection } from "../../utils/functions/getDirection";
import Creature from "./Creature";

export default abstract class Animal extends Creature {
  move() {
    const moveDirection = getDirection();

    this.position.x += moveDirection.x;
    if (this.position.x > MAP_CELL_AMOUNT - 1) {
      this.position.x = MAP_CELL_AMOUNT - 1;
    } else if (this.position.x < 0) {
      this.position.x = 0;
    }

    this.position.y += moveDirection.y;
    if (this.position.y > MAP_CELL_AMOUNT - 1) {
      this.position.y = MAP_CELL_AMOUNT - 1;
    } else if (this.position.y < 0) {
      this.position.y = 0;
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
        this.position.x === creature.position.x &&
        this.position.y === creature.position.y
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
