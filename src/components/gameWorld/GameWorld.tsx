import React from "react";

import classes from "./GameWorld.module.scss";

import Creature from "../../classes/creatures/Creature";
import CreatureModel from "../creature/CreatureModel";
import Grid from "../../utils/types/entitiesType";

interface GameWorldProps<T> {
  grid: Grid<T>;
}

const GameWorld: React.FC<GameWorldProps<Creature>> = (props) => {
  return (
    <div className={classes.gameWorld}>
      {props.grid.map((gridRow, y) =>
        gridRow.map(
          (entity, x) =>
            entity && (
              <CreatureModel
                key={Math.random()}
                entity={entity}
                position={{ x, y }}
              />
            )
        )
      )}
    </div>
  );
};

export default GameWorld;
