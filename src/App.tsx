import { useEffect, useState } from "react";

import classes from "./App.module.scss";

import GameWorld from "./components/gameWorld/GameWorld";
import Creature from "./classes/creatures/Creature";
import Wolf from "./classes/creatures/animals/Wolf";
import Animal from "./classes/creatures/Animal";

function App() {
  const [currentDay, setCurrentDay] = useState(0);
  const [currentCreatures, setCurrentCreatures] = useState<Creature[]>([]);

  useEffect(() => {
    setCurrentCreatures([new Wolf()]);
  }, []);

  const Play = () => {
    currentCreatures.forEach((creature) => {
      if (creature instanceof Animal) {
        creature.move();
      }
    });

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
