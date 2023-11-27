import PlayRoundData from "../../utils/Interfaces/playRoundDataInterface";
import { PlayRoundResult } from "../../utils/Interfaces/playRoundResultInterface";
import Position from "../../utils/Interfaces/positionInterface";
import { findEmptySlotAround } from "../../utils/functions/findEmptySlotAround";
import Grid from "../../utils/types/entitiesType";

import Creature from "./Creature";

export default abstract class Plant extends Creature {
  play(roundData: PlayRoundData<Creature>): PlayRoundResult {
    const result = this.trySpread(roundData.position, roundData.grid);
    return result;
  }
  trySpread(actionPosition: Position, grid: Grid<Creature>): PlayRoundResult {
    if (!this.isAlive) {
      return { action: "none" };
    }
    if (this.procreateChance < Math.random()) {
      return { action: "none" };
    }
    const spot = findEmptySlotAround(actionPosition, grid);
    if (!spot.didSuccess) {
      return { action: "none" };
    }
    const newCreature = this.spawnChild()!;
    return {
      action: "procreate",
      newEntity: newCreature,
      newEntityPosition: spot.newEntitiyPosition!,
    };
  }
}
