import { useEffect, useState } from "react";

import classes from "./App.module.scss";

import GameWorld from "./components/gameWorld/GameWorld";
import Creature from "./classes/creatures/Creature";
import Wolf from "./classes/creatures/animals/Wolf";
import Rabbit from "./classes/creatures/animals/Rabbit";
import { MAP_CELL_AMOUNT } from "./utils/constans/gameSettings";
import Grid from "./utils/types/entitiesType";
import { getRandomEmptyGridPoint } from "./utils/functions/getRandomEmptyGridPoint";
import {
  PlayRoundResultAttack,
  PlayRoundResultMove,
  PlayRoundResultProcreate,
} from "./utils/Interfaces/playRoundResultInterface";
import { move } from "./utils/functions/move";
import { removeDead } from "./utils/functions/removeDead";
import Button from "./components/ui/Button";
import Bamboo from "./classes/creatures/plants/Bamboo";

const DOMMY_ENTITIES = [
  new Wolf(),
  new Wolf(),
  new Wolf(),
  new Rabbit(),
  new Bamboo(),
];

function App() {
  const [currentDay, setCurrentDay] = useState(0);
  const [entitiesGrid, setEntitiesGrid] = useState<Grid<Creature>>([[]]);

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
      }
    });

    setEntitiesGrid(initEntitiresGrid);
  };

  useEffect(() => {
    initGame();
  }, []);

  const Play = () => {
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

            switch (result.action) {
              case "move": {
                const moveResult = result as PlayRoundResultMove;
                move(position, moveResult.newPosition, roundGrid);
                break;
              }
              case "attack-success": {
                const attackResult = result as PlayRoundResultAttack;
                move(position, attackResult.newPosition, roundGrid);
                break;
              }
              case "procreate": {
                const procreateResult = result as PlayRoundResultProcreate;
                roundGrid[procreateResult.newEntityPosition.y][
                  procreateResult.newEntityPosition.x
                ] = procreateResult.newEntity;
                break;
              }
            }
          }
        });
      });

      removeDead(roundGrid);

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
      <Button onClick={Play}>Play</Button>
    </div>
  );
}

export default App;
