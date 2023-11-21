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

      if (other === this) {
        console.log(" cant fuck it self");
        return { action: "none" };
      }

      if (other.name === this.name) {
        const procreateResult = this.procreate({ x, y }, other, grid);
        return procreateResult;
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
