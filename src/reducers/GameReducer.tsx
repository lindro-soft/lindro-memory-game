import { CardType } from "../types/CardType";
import { GameStateType } from "../types/GameStateType";
import { shuffleArray } from "../helpers/shuffleArray";

type Action =
  | { type: "ADD_CARD"; item: CardType }
  | { type: "SET_CLICKS"; clicks: number }
  | { type: "SET_TOTAL_CLICKS"; totalClicks: number }
  | { type: "SHOW_BACK_OF_ALL_CARDS" }
  | { type: "TURN_CLICKED_CARD"; clickedCardId: string }
  | { type: "MARK_PAIR_AS_FOUND_IF_FOUND" }
  | { type: "SHUFFLE_CARDS" }
  | { type: "RESET_GAME" };

function GameReducer(state: GameStateType, action: Action): GameStateType {
  switch (action.type) {
    case "ADD_CARD":
      return {
        ...state,
        cards: [...state.cards, action.item]
      };
    case "SET_CLICKS":
      return { ...state, clicks: action.clicks };
    case "SET_TOTAL_CLICKS":
      return { ...state, totalClicks: action.totalClicks };
    case "SHOW_BACK_OF_ALL_CARDS":
      return {
        ...state,
        cards: state.cards.map(card => ({
          ...card,
          showBack: true
        }))
      };
    case "TURN_CLICKED_CARD":
      return {
        ...state,
        cards: state.cards.map(card =>
          card.id !== action.clickedCardId
            ? card
            : {
                ...card,
                showBack: false
              }
        )
      };
    case "MARK_PAIR_AS_FOUND_IF_FOUND":
      const exposedCards = state.cards.filter(card => !card.showBack);
      let cards = state.cards;
      if (exposedCards.length === 2) {
        if (exposedCards[0].image === exposedCards[1].image) {
          cards = markExposedCardsAsFound(state);
        }
      }
      return { ...state, cards: cards };
    case "SHUFFLE_CARDS":
      return { ...state, cards: shuffleArray(state.cards) };
    case "RESET_GAME":
      return {
        cards: shuffleArray(
          state.cards.map(card => ({
            ...card,
            showBack: true,
            found: false
          }))
        ),
        clicks: 0,
        totalClicks: 0
      };
  }
}

function markExposedCardsAsFound(state: GameStateType) {
  return state.cards.map(card =>
    card.showBack
      ? card
      : {
          ...card,
          found: true
        }
  );
}

export default GameReducer;
