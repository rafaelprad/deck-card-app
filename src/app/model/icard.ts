export interface ICard {
  index : number;
  symbol : string;
  value : number;
  suit : ECardSuit;
  color : string;
}

export enum ECardSuit {
  Club = 'club',
  Diamond = 'diamond',
  Hearth = 'hearth',
  Spade = 'spade'
}