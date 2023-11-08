import Animal from "../Animal";

export default class Wolf extends Animal {
  constructor() {
    super();

    this.name = "Wolf";
    this.strength = 8;
  }

  spawnChild() {
    return new Wolf();
  }
}
