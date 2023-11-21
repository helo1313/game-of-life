import { PropsWithChildren } from "react";
import classes from "./Button.module.scss";

interface ButtonProps extends PropsWithChildren {
  onClick: () => void;
}

const Button: React.FC<ButtonProps> = (props) => {
  return (
    <button className={classes.playButton} onClick={props.onClick}>
      {props.children}
    </button>
  );
};

export default Button;
