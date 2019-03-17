import { ICard } from './icard';
import { IPlayer } from './iplayer';

export interface IDeck {
  index : number;
  name : string;
  qtyMinimumBet : number;
  listCard : ICard[];
  listPlayer : IPlayer[];
  listPlayerBet : IPlayer[];
  listPlayerFold : IPlayer[];
}