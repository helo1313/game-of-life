import { MAP_CELL_AMOUNT } from "../../utils/constans/gameSettings";

export default abstract class Creature {
  x: number;
  y: number;

  constructor() {
    this.x = Math.floor(Math.random() * MAP_CELL_AMOUNT);
    this.y = Math.floor(Math.random() * MAP_CELL_AMOUNT);

    console.log(
      "created creature on conordinates(" + this.x + "," + this.y + ")"
    );
  }

  move() {
    console.log("creature moved");
  }
}
