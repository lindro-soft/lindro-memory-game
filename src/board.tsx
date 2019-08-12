import React from "react";
import Card from "./card";

interface CardType {
  id: string;
  image: string;
  showBack: boolean;
  backImage: string;
  found: boolean;
}

interface PropTypes {
  cards: any;
  onClickCard: (id: string, showBack: boolean) => void;
}

const Board: React.FC<PropTypes> = ({
  cards = [],
  onClickCard: onClickCard = f => f
}) => {
  return cards.map((card: CardType) => (
    <Card
      image={card.image}
      showBack={card.showBack}
      backImage={card.backImage}
      id={card.id}
      key={card.id}
      found={card.found}
      onClickCard={() => onClickCard(card.id, !card.showBack)}
    />
  ));
};

export default Board;
