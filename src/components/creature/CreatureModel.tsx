import React from "react";

import Creature from "../../classes/creatures/Creature";

import classes from "./CreatureModel.module.scss";
import { MAP_CELL_AMOUNT } from "../../utils/constans/gameSettings";

interface CreatureProps {
  creatureData: Creature;
}

const CreatureModel: React.FC<CreatureProps> = (props) => {
  const mapXPosition = props.creatureData.position.x * (800 / MAP_CELL_AMOUNT);
  const mapYPosition = props.creatureData.position.y * (800 / MAP_CELL_AMOUNT);

  return (
    <div
      className={classes.creature}
      style={{
        left: `${mapXPosition}px`,
        top: `${mapYPosition}px`,
        backgroundColor: `${props.creatureData.color}`,
      }}
    ></div>
  );
};

export default CreatureModel;
