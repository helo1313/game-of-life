import Animal from "../Animal";

export default class Rabbit extends Animal {
  constructor() {
    super();

    this.name = "Rabbit";
    this.icon = "🐰";
    this.strength = 1;
    this.procreateChance = 0.6;
  }

  spawnChild() {
    return new Rabbit();
  }
}
