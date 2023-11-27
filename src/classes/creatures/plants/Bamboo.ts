import Plant from "../Plant";

export default class Bamboo extends Plant {
  constructor() {
    super();
    this.name = "Bamboo";
    this.icon = "🎋";
    this.strength = 0;
    this.procreateChance = 0.075;
  }
  spawnChild() {
    return new Bamboo();
  }
}
