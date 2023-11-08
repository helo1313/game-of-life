import { useEffect, useState } from "react";

import classes from "./App.module.scss";

import GameWorld from "./components/gameWorld/GameWorld";
import Creature from "./classes/creatures/Creature";
import Wolf from "./classes/creatures/animals/Wolf";
import Animal from "./classes/creatures/Animal";
import Sheep from "./classes/creatures/animals/Sheep";

function App() {
  const [currentDay, setCurrentDay] = useState(0);
  const [currentCreatures, setCurrentCreatures] = useState<Creature[]>([]);

  const spawn: () => Creature[] = () => {
    let creatures: Creature[] = [];

    creatures.push(new Wolf());
    creatures.push(new Wolf());
    creatures.push(new Wolf());
    creatures.push(new Sheep());

    return creatures;
  };

  useEffect(() => {
    setCurrentCreatures(spawn());
  }, []);

  const removeDead: (creatures: Creature[]) => Creature[] = (creatures) => {
    return creatures.filter((creature) => {
      return creature.isAlive;
    });
  };

  const Play = () => {
    const creatures = [...currentCreatures];

    creatures.forEach((creature) => {
      if (creature instanceof Animal) {
        creature.move();
        creature.interact(creatures);
      }
    });

    setCurrentCreatures(removeDead(creatures));
    setCurrentDay((prevState) => {
      return prevState + 1;
    });
  };

  return (
    <div className={classes.app}>
      <p>Day {currentDay}</p>
      <GameWorld creatures={currentCreatures} />
      <button className={classes.playButton} onClick={Play}>
        Play
      </button>
    </div>
  );
}

export default App;
