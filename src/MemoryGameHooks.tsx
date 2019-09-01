import React, { useState, useEffect, useReducer } from "react";
import { v4 } from "uuid";
import Board from "./Board";
import classes from "./styling/App.module.scss";
import GameButton from "./GameButton";
import GameReducer from "./reducers/GameReducer";

function MemoryGameHooks() {
  const [query] = useState<string>();
  const [{ cards, clicks, totalClicks }, dispatch] = useReducer(GameReducer, {
    cards: [],
    clicks: 0,
    totalClicks: 0
  });

  const addCard = (image: string) => {
    dispatch({
      type: "ADD_CARD",
      item: {
        id: v4(),
        image: image,
        showBack: true,
        backImage: "mosaic_purple.jpg",
        found: false
      }
    });
  };

  const setClicks = (clicks: number) => {
    dispatch({
      type: "SET_CLICKS",
      clicks: clicks
    });
  };

  const setTotalClicks = (totalClicks: number) => {
    dispatch({
      type: "SET_TOTAL_CLICKS",
      totalClicks: totalClicks
    });
  };

  const showBackOfAllCards = () => {
    dispatch({
      type: "SHOW_BACK_OF_ALL_CARDS"
    });
  };

  const turnClickedCard = (id: string) => {
    dispatch({
      type: "TURN_CLICKED_CARD",
      clickedCardId: id
    });

    markPairAsFoundIfFound();
  };

  const markPairAsFoundIfFound = () => {
    dispatch({
      type: "MARK_PAIR_AS_FOUND_IF_FOUND"
    });
  };

  const shuffleCards = () => {
    dispatch({
      type: "SHUFFLE_CARDS"
    });
  };

  const clickCard = (id: string, showBack: boolean) => {
    const clickedCards = cards.filter(card => card.id === id);

    if (clickedCards[0].showBack && !clickedCards[0].found) {
      if (clicks > 1) {
        setClicks(1);
        showBackOfAllCards();
      } else {
        setClicks(clicks + 1);
      }
      turnClickedCard(id);
      setTotalClicks(totalClicks + 1);
    }
  };

  const clickButton = () => {
    dispatch({ type: "RESET_GAME" });
  };

  useEffect(() => {
    const addTwoCards = (image: string) => {
      addCard(image);
      addCard(image);
    };
    addTwoCards("unicorn-2128415_640.png");
    addTwoCards("panda-151605_640.png");
    addTwoCards("Amanda.jpg");
    addTwoCards("stjernekrigerne.png");
    addTwoCards("Vigga.jpg");
    addTwoCards("ice-cream-3571774_640.png");
    addTwoCards("wall-2794569_640.jpg");
    addTwoCards("anthropomorphized-animals-1296354_640.png");
    shuffleCards();
  }, [query]);

  return (
    <div className={classes.board}>
      <Board cards={cards} onClickCard={clickCard} />
      <div>
        <GameButton onClickButton={clickButton} value="Nyt spil" />
        <span className={classes.totalClicks}>Card turns: {totalClicks}</span>
      </div>
    </div>
  );
}

export default MemoryGameHooks;
