import { MAP_CELL_AMOUNT } from "../../utils/constans/gameSettings";

export default abstract class Creature {
  x: number;
  y: number;

  isAlive: boolean;

  constructor() {
    this.x = Math.floor(Math.random() * MAP_CELL_AMOUNT);
    this.y = Math.floor(Math.random() * MAP_CELL_AMOUNT);

    this.isAlive = true;

    console.log(
      "created creature on conordinates(" + this.x + "," + this.y + ")"
    );
  }
}
