import { getDirection } from "../../utils/functions/getDirection";
import Creature from "./Creature";

export default abstract class Animal extends Creature {
  move() {
    console.log("Animal moved");

    const moveDirection = getDirection();

    this.x += moveDirection.x;
    this.y += moveDirection.y;
  }
}
