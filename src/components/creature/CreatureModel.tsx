import React from "react";

import Creature from "../../classes/creatures/Creature";

import classes from "./CreatureModel.module.scss";
import { MAP_CELL_AMOUNT } from "../../utils/constans/gameSettings";
import Position from "../../utils/Interfaces/positionInterface";

interface CreatureProps {
  entity: Creature;
  position: Position;
}

const CreatureModel: React.FC<CreatureProps> = (props) => {
  const { entity, position } = props;

  const mapXPosition = position.x * (600 / MAP_CELL_AMOUNT);
  const mapYPosition = position.y * (600 / MAP_CELL_AMOUNT);

  return (
    <div
      className={classes.creature}
      style={{
        left: `${mapXPosition}px`,
        top: `${mapYPosition}px`,
      }}
    >
      <p className={classes.icon}>
        <span>{props.entity.icon}</span>
      </p>
    </div>
  );
};

export default CreatureModel;
