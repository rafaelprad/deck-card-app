import { Injectable } from '@angular/core';
import { IPlayer } from '../model/iplayer';
import { IPlay } from '../model/iplay';

@Injectable()
export class LoginService {

  private play: IPlay;

  constructor() {
  }

  public setPlayData(player: IPlayer, qtyMinimumBet : number) {
    this.play = <IPlay>{};
    this.play.player = player;
    this.play.qtyMinimumBet = qtyMinimumBet;
  }

  public getPlay() : IPlay {
    return this.play;
  }

  public isPlaying() : boolean {
    let result : boolean = false;
    if ( this.play !== undefined &&
      this.play.player !== undefined &&
      this.play.qtyMinimumBet !== undefined ) {
      result = true;
    }
    return result;
  }

  public clearPlay() {
    this.play = undefined;
  }

  public clear() {
    this.clearPlay();
  }
}
