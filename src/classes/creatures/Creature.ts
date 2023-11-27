import PlayRoundData from "../../utils/Interfaces/playRoundDataInterface";
import { PlayRoundResult } from "../../utils/Interfaces/playRoundResultInterface";
import Position from "../../utils/Interfaces/positionInterface";
import { MAP_CELL_AMOUNT } from "../../utils/constans/gameSettings";

export default abstract class Creature {
  position: Position;
  lastPlayRound: number;

  isAlive: boolean;
  name: string;
  icon: string;
  strength: number;
  procreateChance: number;

  constructor() {
    this.position = {
      x: Math.floor(Math.random() * MAP_CELL_AMOUNT),
      y: Math.floor(Math.random() * MAP_CELL_AMOUNT),
    };
    this.lastPlayRound = 0;

    this.name = "";
    this.icon = "🛑";

    this.isAlive = true;
    this.strength = 0;
    this.procreateChance = 0.35;
  }

  playRound(roundData: PlayRoundData<Creature>): PlayRoundResult {
    if (roundData.round <= this.lastPlayRound) {
      return { action: "none" };
    }

    this.lastPlayRound = roundData.round;

    let result: PlayRoundResult = { action: "none" };

    result = this.play(roundData);

    return result;
  }

  play(roundData: PlayRoundData<Creature>): PlayRoundResult {
    return { action: "none" };
  }

  spawnChild(): Creature | null {
    return null;
  }
}
