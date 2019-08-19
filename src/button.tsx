import React from "react";
import styles from "./button.module.css";

interface PropTypes {
  value: string;
  onClickButton: (event: React.MouseEvent<HTMLButtonElement>) => void;
}

const Button: React.FC<PropTypes> = ({
  value,
  onClickButton: onClickButton = f => f
}) => {
  return (
    <button className={styles.btn} onClick={onClickButton}>
      {value}
    </button>
  );
};

export default Button;
