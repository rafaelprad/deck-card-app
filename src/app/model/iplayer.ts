import { ICard } from './icard';
import { EventEmitter } from '@angular/core';
import { IAvatar } from './iavatar';

export interface IPlayer {
  index : number;
  name : string;
  qtyPockerChip10 : number;
  qtyPockerChip20 : number;
  qtyPockerChip100 : number;
  qtyPockerChip10ToBet : number;
  qtyPockerChip20ToBet : number;
  qtyPockerChip100ToBet : number;
  //
  qtyLastMinimumBlind : number;
  //
  handRisk : number;
  listCard : ICard[];
  avatar : IAvatar;
  staPlaying : boolean;
  emitter : EventEmitter<any>;
}