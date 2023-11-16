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
import { PlayRoundResultMove } from "./utils/Interfaces/playRoundResultInterface";

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
      const result = getRandomEmptyGridPoint(initEntitiresGrid);
      if (result.didSuccess) {
        initEntitiresGrid[result.position!.x][result.position!.y] = entity;
      } else {
        console.log("unable to find position for entity " + entity);
      }
    });

    console.log(initEntitiresGrid);
    setEntitiesGrid(initEntitiresGrid);
  };

  useEffect(() => {
    initGame();
  }, []);

  const removeDead: (creatures: Creature[]) => Creature[] = (creatures) => {
    return creatures.filter((creature) => {
      return creature.isAlive;
    });
  };

  const Play = () => {
    // const creatures = [...currentCreatures];
    // let newCreatures: Creature[] = [];

    // creatures.forEach((creature) => {
    //   if (creature instanceof Animal) {
    //     creature.move();
    //     const interactionResult = creature.interact(creatures);

    //     console.log(interactionResult);

    //     if (interactionResult.result === "procreate") {
    //       newCreatures.push(interactionResult.newCreature!);
    //     }
    //   }
    // });

    // const roundEndCreatures = [...removeDead(creatures), ...newCreatures];
    // setCurrentCreatures(roundEndCreatures);

    // TODO: Check if copying entitiesGrid will be good when working with state or
    // if we need to use (prevGrid) => {} to mutate state in proper way

    setEntitiesGrid((prevGrid) => {
      const roundGrid: Grid<Creature> = [...prevGrid];

      roundGrid.forEach((gridRow, y) => {
        gridRow.forEach((entity, x) => {
          const position = { x, y };
          if (entity) {
            const result = entity.playRound({
              grid: roundGrid,
              position: position,
              round: currentDay + 1,
            });

            console.log(result.action);
            switch (result.action) {
              case "move": {
                const moveResult = result as PlayRoundResultMove;
                if (
                  roundGrid[moveResult.newPosition.y][
                    moveResult.newPosition.x
                  ] !== roundGrid[position.y][position.x]
                ) {
                  roundGrid[moveResult.newPosition.y][
                    moveResult.newPosition.x
                  ] = roundGrid[position.y][position.x];
                  roundGrid[position.y][position.x] = null;
                }
                break;
              }
            }
          }
        });
      });

      console.log(roundGrid);

      return roundGrid;
    });

    setCurrentDay((prevState) => {
      return prevState + 1;
    });
  };

  return (
    <div className={classes.app}>
      <p>Day {currentDay}</p>
      <GameWorld grid={entitiesGrid} />
      <button className={classes.playButton} onClick={Play}>
        Play
      </button>
    </div>
  );
}

export default App;
