import Animal from "../Animal";

export default class Sheep extends Animal {
  constructor() {
    super();

    this.color = "white";

    this.name = "Sheep";
    this.strength = 2;
  }
}
