import { MAP_CELL_AMOUNT } from "../../utils/constans/gameSettings";

export default abstract class Creature {
  x: number;
  y: number;

  color: string;

  isAlive: boolean;
  name: string;
  strength: number;

  constructor() {
    this.x = Math.floor(Math.random() * MAP_CELL_AMOUNT);
    this.y = Math.floor(Math.random() * MAP_CELL_AMOUNT);

    this.color = "red";

    this.name = "";
    this.isAlive = true;
    this.strength = 0;

    console.log(
      "created creature on conordinates(" + this.x + "," + this.y + ")"
    );
  }
}
