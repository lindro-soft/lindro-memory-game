import React from "react";
import styles from "./card.module.css";

interface PropTypes {
  showBack: boolean;
  backImage: string;
  found: boolean;
  image: string;
  onClickCard: (event: React.MouseEvent<HTMLImageElement>) => void;
}

const Card: React.FC<PropTypes> = ({
  showBack = true,
  found,
  backImage,
  image,
  onClickCard: onClickCard = f => f
}) => {
  return (
    <div className={styles.card}>
      <img
        alt="Card"
        src={require(`./img/${showBack && !found ? backImage : image}`)}
        className={styles.image}
        onClick={onClickCard}
      />
    </div>
  );
};

export default Card;
