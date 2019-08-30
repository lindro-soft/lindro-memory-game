import { CardType } from "./CardType";

export type GameStateType = {
  cards: CardType[];
  clicks: number;
  totalClicks: number;
};
