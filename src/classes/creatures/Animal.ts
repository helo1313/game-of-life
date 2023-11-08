import { MAP_CELL_AMOUNT } from "../../utils/constans/gameSettings";
import { getDirection } from "../../utils/functions/getDirection";
import Creature from "./Creature";

export default abstract class Animal extends Creature {
  move() {
    console.log("Animal moved");

    const moveDirection = getDirection();

    this.x += moveDirection.x;
    if (this.x > MAP_CELL_AMOUNT - 1) {
      this.x = MAP_CELL_AMOUNT - 1;
    } else if (this.x < 0) {
      this.x = 0;
    }

    this.y += moveDirection.y;
    if (this.y > MAP_CELL_AMOUNT - 1) {
      this.y = MAP_CELL_AMOUNT - 1;
    } else if (this.y < 0) {
      this.y = 0;
    }
  }
}
