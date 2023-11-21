import PlayRoundData from "../../utils/Interfaces/playRoundDataInterface";
import { PlayRoundResult } from "../../utils/Interfaces/playRoundResultInterface";
import { MAP_CELL_AMOUNT } from "../../utils/constans/gameSettings";
import { getDirection } from "../../utils/functions/getDirection";
import { isPositionEmpty } from "../../utils/functions/isPositionEmpty";
import Creature from "./Creature";

export default abstract class Animal extends Creature {
  play(roundData: PlayRoundData<Creature>): PlayRoundResult {
    const { position, grid } = roundData;
    const moveDirection = getDirection();

    let x = position.x + moveDirection.x;
    if (x > MAP_CELL_AMOUNT - 1) {
      x = MAP_CELL_AMOUNT - 1;
    } else if (x < 0) {
      x = 0;
    }

    let y = position.y + moveDirection.y;
    if (y > MAP_CELL_AMOUNT - 1) {
      y = MAP_CELL_AMOUNT - 1;
    } else if (y < 0) {
      y = 0;
    }

    if (isPositionEmpty({ x, y }, grid)) {
      return { action: "move", newPosition: { x, y } };
    } else {
      const other = grid[y][x]!;

      if (other.name === this.name) {
        // Procreate
      } else {
        const attackSuccess = this.attack(other);
        if (attackSuccess) {
          return { action: "attack-success", newPosition: { x, y } };
        } else {
          return { action: "attack-failed" };
        }
      }
    }

    return { action: "none" };
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
      return true;
    }

    if (this.strength > otherCreature.strength) {
      otherCreature.isAlive = false;
      return true;
    } else {
      this.isAlive = false;
      return false;
    }
  }
}
