import React from "react";

import Creature from "../../classes/creatures/Creature";

import classes from "./CreatureModel.module.scss";
import { MAP_CELL_AMOUNT } from "../../utils/constans/gameSettings";

interface CreatureProps {
  creatureData: Creature;
}

const CreatureModel: React.FC<CreatureProps> = (props) => {
  return (
    <div
      className={classes.creature}
      style={{
        left: `${props.creatureData.x * (800 / MAP_CELL_AMOUNT)}px`,
        top: `${props.creatureData.y * (800 / MAP_CELL_AMOUNT)}px`,
      }}
    ></div>
  );
};

export default CreatureModel;
