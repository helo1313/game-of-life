import Creature from "../../classes/creatures/Creature";
import Position from "./positionInterface";

export type PlayRoundResult =
  | PlayRoundResultInterface
  | PlayRoundResultMove
  | PlayRoundResultProcreate;

export interface PlayRoundResultInterface {
  action: "none" | "move" | "attack-success" | "attack-failed" | "procreate";
}

export interface PlayRoundResultMove extends PlayRoundResultInterface {
  newPosition: Position;
}

export interface PlayRoundResultAttack extends PlayRoundResultInterface {
  newPosition: Position;
}

export interface PlayRoundResultProcreate extends PlayRoundResultInterface {
  newEntity: Creature;
  newEntityPosition: Position;
}
