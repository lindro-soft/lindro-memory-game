import React from "react";
import styles from "./styling/Button.module.css";

interface PropTypes {
  value: string;
  onClickButton: (event: React.MouseEvent<HTMLButtonElement>) => void;
}

const GameButton: React.FC<PropTypes> = ({
  value,
  onClickButton: onClickButton = f => f
}) => {
  return (
    <button className={styles.btn} onClick={onClickButton}>
      {value}
    </button>
  );
};

export default GameButton;
