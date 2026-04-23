import React from "react";
import styles from "./card.module.css";

const images = import.meta.glob("./img/*", { eager: true, import: "default" }) as Record<string, string>;

function resolveImage(filename: string): string {
  return images[`./img/${filename}`] ?? "";
}

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
  const src = resolveImage(showBack && !found ? backImage : image);
  return (
    <div className={styles.card}>
      <img
        alt="Card"
        src={src}
        className={styles.image}
        onClick={onClickCard}
      />
    </div>
  );
};

export default Card;
