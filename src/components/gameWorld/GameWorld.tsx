import React from "react";

import classes from "./GameWorld.module.scss";

import Creature from "../../classes/creatures/Creature";
import CreatureModel from "../creature/CreatureModel";

interface GameWorldProps {
  creatures: Creature[];
}

const GameWorld: React.FC<GameWorldProps> = (props) => {
  return (
    <div className={classes.gameWorld}>
      {props.creatures.map((creatureInstance) => (
        <CreatureModel key={Math.random()} creatureData={creatureInstance} />
      ))}
    </div>
  );
};

export default GameWorld;
