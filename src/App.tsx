import { useEffect, useState } from "react";

import classes from "./App.module.scss";

import GameWorld from "./components/gameWorld/GameWorld";
import Creature from "./classes/creatures/Creature";
import Wolf from "./classes/creatures/animals/Wolf";

function App() {
  const [currentCreatures, setCurrentCreatures] = useState<Creature[]>([]);

  useEffect(() => {
    setCurrentCreatures([new Wolf()]);
  }, []);

  return (
    <div className={classes.app}>
      <p>Day X</p>
      <GameWorld creatures={currentCreatures} />
      <button className={classes.playButton}>Play</button>
    </div>
  );
}

export default App;
