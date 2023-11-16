import Grid from "../types/entitiesType";
import Position from "./positionInterface";

export default interface PlayRoundData<T> {
  grid: Grid<T>;
  position: Position;
  round: number;
}
