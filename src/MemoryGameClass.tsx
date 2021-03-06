import React, { Component } from "react";
import { v4 } from "uuid";
import Board from "./Board";
import { shuffleArray } from "./helpers/shuffleArray";
import classes from "./styling/App.module.scss";
import GameButton from "./GameButton";

interface PropTypes {}

interface CardType {
  id: string;
  image: string;
  showBack: boolean;
  backImage: string;
  found: boolean;
}

interface State {
  cards: CardType[];
  clicks: number;
  totalClicks: number;
}

export default class App extends Component<PropTypes, State> {
  state: State = {
    cards: [],
    clicks: 0,
    totalClicks: 0
  };

  constructor(props: PropTypes) {
    super(props);

    this.clickCard = this.clickCard.bind(this);
    this.clickButton = this.clickButton.bind(this);
    this.addCard = this.addCard.bind(this);
    this.addTwoCards = this.addTwoCards.bind(this);
    this.turnClickedCard = this.turnClickedCard.bind(this);

    this.addTwoCards("unicorn-2128415_640.png");
    this.addTwoCards("panda-151605_640.png");
    this.addTwoCards("Amanda.jpg");
    this.addTwoCards("stjernekrigerne.png");
    this.addTwoCards("Vigga.jpg");
    this.addTwoCards("fdm.png");
    this.addTwoCards("wall-2794569_640.jpg");
    this.addTwoCards("anthropomorphized-animals-1296354_640.png");
    this.state = {
      ...this.state,
      cards: shuffleArray(this.state.cards)
    };
  }

  clickButton() {
    this.setState(
      {
        clicks: 0,
        totalClicks: 0,
        cards: shuffleArray(this.state.cards)
      },
      this.resetCards
    );
  }

  clickCard(id: string, showBack: boolean) {
    const { cards, clicks, totalClicks } = this.state;
    const clickedCards = cards.filter(card => card.id === id);

    if (clickedCards[0].showBack && !clickedCards[0].found) {
      if (clicks > 1) {
        this.setState({ clicks: 1 });
        this.showBackOfAllCards();
      } else {
        this.setState({ clicks: clicks + 1 });
      }
      this.turnClickedCard(id, showBack, this.onCardTurned);
      this.setState({ totalClicks: totalClicks + 1 });
    }
  }

  turnClickedCard(id: string, showBack: boolean, onCardTurned: () => void) {
    this.setState(
      prevState => ({
        cards: prevState.cards.map(card =>
          card.id !== id
            ? card
            : {
                ...card,
                showBack
              }
        )
      }),
      onCardTurned
    );
  }

  private onCardTurned() {
    const exposedCards = this.state.cards.filter(card => !card.showBack);
    console.log("exposedCards: ", exposedCards);
    if (exposedCards.length === 2) {
      if (exposedCards[0].image === exposedCards[1].image) {
        this.markExposedCardsAsFound();
      }
    }
  }

  private markExposedCardsAsFound() {
    this.setState(prevState => ({
      cards: prevState.cards.map(card =>
        card.showBack
          ? card
          : {
              ...card,
              found: true
            }
      )
    }));
  }

  showBackOfAllCards() {
    this.setState(prevState => ({
      cards: prevState.cards.map(card => ({
        ...card,
        showBack: true
      }))
    }));
  }

  resetCards() {
    this.setState(prevState => ({
      cards: prevState.cards.map(card => ({
        ...card,
        showBack: true,
        found: false
      }))
    }));
  }

  addTwoCards(image: string) {
    this.addCard(image);
    this.addCard(image);
  }

  addCard(image: string) {
    this.state = {
      ...this.state,
      cards: [
        ...this.state.cards,
        {
          id: v4(),
          image: image,
          showBack: true,
          backImage: "mosaic_purple.jpg",
          found: false
        }
      ]
    };
  }

  render() {
    const { cards, totalClicks } = this.state;
    return (
      <div className={classes.board}>
        <Board cards={cards} onClickCard={this.clickCard} />
        <div>
          <GameButton onClickButton={this.clickButton} value="New Game" />
          <span className={classes.totalClicks}>Card turns: {totalClicks}</span>
        </div>
      </div>
    );
  }
}
