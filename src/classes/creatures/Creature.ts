import { MAP_CELL_AMOUNT } from "../../utils/constans/gameSettings";
import { findEmptySlotAround } from "../../utils/functions/findEmptySlotAround";
import Wolf from "./animals/Wolf";

export default abstract class Creature {
  x: number;
  y: number;

  color: string;

  isAlive: boolean;
  name: string;
  strength: number;
  procreateChance: number;

  constructor() {
    this.x = Math.floor(Math.random() * MAP_CELL_AMOUNT);
    this.y = Math.floor(Math.random() * MAP_CELL_AMOUNT);

    this.color = "red";

    this.name = "";
    this.isAlive = true;
    this.strength = 0;
    this.procreateChance = 0.35;
  }

  add(a: number, b: number): number {
    return 0;
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

    const spot = findEmptySlotAround(this.x, this.y, creatures);

    if (!spot.didSuccess) {
      return { didSuccess: false };
    }

    if (this.procreateChance < Math.random()) {
      return { didSuccess: false };
    }

    const newCreature = { ...this };
    newCreature.x = spot.x!;
    newCreature.y = spot.y!;

    return { didSuccess: true, newCreature: newCreature };
  }
}
