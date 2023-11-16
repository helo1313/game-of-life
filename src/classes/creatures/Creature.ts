import PlayRoundData from "../../utils/Interfaces/playRoundDataInterface";
import { PlayRoundResult } from "../../utils/Interfaces/playRoundResultInterface";
import Position from "../../utils/Interfaces/positionInterface";
import { MAP_CELL_AMOUNT } from "../../utils/constans/gameSettings";
import { findEmptySlotAround } from "../../utils/functions/findEmptySlotAround";
import Animal from "./Animal";
import Wolf from "./animals/Wolf";

export default abstract class Creature {
  position: Position;
  lastPlayRound: number;

  color: string;

  isAlive: boolean;
  name: string;
  strength: number;
  procreateChance: number;

  constructor() {
    this.position = {
      x: Math.floor(Math.random() * MAP_CELL_AMOUNT),
      y: Math.floor(Math.random() * MAP_CELL_AMOUNT),
    };
    this.lastPlayRound = 0;

    this.color = "red";

    this.name = "";
    this.isAlive = true;
    this.strength = 0;
    this.procreateChance = 0.35;
  }

  playRound(roundData: PlayRoundData<Creature>): PlayRoundResult {
    if (roundData.round <= this.lastPlayRound) {
      return { action: "none" };
    }

    this.lastPlayRound = roundData.round;

    if (this instanceof Animal) {
      const result = this.play(roundData);
      return result;
    } else {
      console.log("nie animal");
    }

    return { action: "none" };
  }

  spawnChild(): Creature | null {
    return null;
  }

  procreate(
    otherCreature: Creature,
    creatures: Creature[]
  ): {
    didSuccess: boolean;
    newCreature?: Creature;
  } {
    if (!this.isAlive || !otherCreature.isAlive) {
      return { didSuccess: false };
    }

    const spot = findEmptySlotAround(
      this.position.x,
      this.position.y,
      creatures
    );

    if (!spot.didSuccess) {
      console.log("did not success");
      return { didSuccess: false };
    }

    if (this.procreateChance < Math.random()) {
      return { didSuccess: false };
    }

    const newCreature = this.spawnChild()!;
    newCreature.position.x = spot.x!;
    newCreature.position.y = spot.y!;

    return { didSuccess: true, newCreature: newCreature };
  }
}
