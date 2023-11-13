import { useEffect, useState } from "react";

import classes from "./App.module.scss";

import GameWorld from "./components/gameWorld/GameWorld";
import Creature from "./classes/creatures/Creature";
import Wolf from "./classes/creatures/animals/Wolf";
import Animal from "./classes/creatures/Animal";
import Sheep from "./classes/creatures/animals/Sheep";
import { MAP_CELL_AMOUNT } from "./utils/constans/gameSettings";
import Grid from "./utils/types/entitiesType";
import { getRandomEmptyGridPoint } from "./utils/functions/getRandomEmptyGridPoint";

const DOMMY_ENTITIES = [new Wolf(), new Wolf(), new Wolf(), new Sheep()];

function App() {
  const [currentDay, setCurrentDay] = useState(0);
  const [entitiesGrid, setEntitiesGrid] = useState<Grid<Creature>>([[]]);

  const [currentCreatures, setCurrentCreatures] = useState<Creature[]>([]);

  const initGame = () => {
    let initEntitiresGrid: Grid<Creature> = [[]];

    for (let i = 0; i < MAP_CELL_AMOUNT; i++) {
      initEntitiresGrid.push([]);
      for (let j = 0; j < MAP_CELL_AMOUNT; j++) {
        initEntitiresGrid[i]!.push(null);
      }
    }

    // we want to pop the element that was inited at declaration, this is the easiest way to correctly build our map
    initEntitiresGrid.pop();

    DOMMY_ENTITIES.forEach((entity) => {
      const position = getRandomEmptyGridPoint(initEntitiresGrid);
      initEntitiresGrid[position.x][position.y] = entity;
    });

    console.log(initEntitiresGrid);
  };

  initGame();

  const spawn: () => Creature[] = () => {
    let creatures: Creature[] = [];

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
    let newCreatures: Creature[] = [];

    creatures.forEach((creature) => {
      if (creature instanceof Animal) {
        creature.move();
        const interactionResult = creature.interact(creatures);

        console.log(interactionResult);

        if (interactionResult.result === "procreate") {
          newCreatures.push(interactionResult.newCreature!);
        }
      }
    });

    const roundEndCreatures = [...removeDead(creatures), ...newCreatures];
    setCurrentCreatures(roundEndCreatures);
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
