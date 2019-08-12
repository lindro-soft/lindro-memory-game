import React, { Component } from "react";
import { v4 } from "uuid";
import Board from "./board";
import { shuffleArray } from "./helpers/shuffleArray";

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      cards: [],
      clicks: 0
    };
    this.clickCard = this.clickCard.bind(this);
    this.addCard = this.addCard.bind(this);
    this.addTwoCards = this.addTwoCards.bind(this);
    this.turnClickedCard = this.turnClickedCard.bind(this);

    // this.addTwoCards("unicorn-2128415_640.png");
    // this.addTwoCards("panda-151605_640.png");
    // this.addTwoCards("Amanda.jpg");
    // this.addTwoCards("girls-2814009_640.jpg");
    this.addTwoCards("unicorn-4127195_640.png");
    this.addTwoCards("ice-cream-3571774_640.png");
    this.addTwoCards("wall-2794569_640.jpg");
    this.addTwoCards("anthropomorphized-animals-1296354_640.png");
    this.state = {
      clicks: this.state.clicks,
      cards: shuffleArray(this.state.cards)
    };
  }

  clickCard(id, showBack) {
    const { cards, clicks } = this.state;
    const clickedCards = cards.filter(card => card.id == id);

    if (clickedCards[0].showBack) {
      if (clicks > 1) {
        this.setState({ clicks: 1 });
        this.showBackOfAllCards();
      } else {
        this.setState({ clicks: clicks + 1 });
      }
      this.turnClickedCard(id, showBack);
    }
  }

  turnClickedCard(id, showBack) {
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
      () => {
        const exposedCards = this.state.cards.filter(card => !card.showBack);
        console.log("exposedCards: ", exposedCards);
        if (exposedCards.length == 2) {
          if (exposedCards[0].image == exposedCards[1].image) {
            alert("Tillykke");
          }
        }
        console.log("all cards: ", exposedCards.length);
      }
    );
  }

  showBackOfAllCards() {
    this.setState(prevState => ({
      cards: prevState.cards.map(card => ({
        ...card,
        showBack: true
      }))
    }));
  }

  addTwoCards(image) {
    this.addCard(image);
    this.addCard(image);
  }

  addCard(image) {
    this.state = {
      clicks: this.state.clicks,
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
    const { cards, clicks } = this.state;
    return (
      <div>
        <Board cards={cards} onClickCard={this.clickCard} />
        <div>clicks: {clicks}</div>
      </div>
    );
  }
}
