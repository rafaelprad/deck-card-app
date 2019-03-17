import { Component, ChangeDetectorRef, Input } from '@angular/core';
import { IPlayer } from '../../model/iplayer';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { IAvatar } from 'src/app/model/iavatar';
import { ICard } from 'src/app/model/icard';
import { HandCheck } from 'src/app/deck/deck-hand';
import { DeckAction } from 'src/app/deck/deck.enum';

@Component({
  selector: 'player',
  templateUrl: './player.component.html',
  styleUrls: ['./player.component.css']
})
export class PlayerComponent {

  @Input()
  player : IPlayer;

  private pathFilenameAvatar : string = "../../assets/images/avatar-";
  private extensionFilenameAvatar : string = ".png";

  constructor(
    private changeDetectorRef: ChangeDetectorRef,
    private sanitizer: DomSanitizer) {

  }

  // Angular circle events live

  ngOnInit() {
  }

  ngOnDestroy() {
    this.changeDetectorRef.detach();
  }

  getUrlAvatarFilename() : SafeUrl {
    let result : string = this.pathFilenameAvatar + this.player.avatar.index + this.extensionFilenameAvatar;

    return this.sanitizer.bypassSecurityTrustUrl(result);
  }

  getClass() : string {
    let result : string = '';
    if ( this.player.name !== undefined ) {
      result = 'active';
    }
    return result;
  }

  getName() : string {
    let result : string = '';
    if ( this.player.name === undefined ) {
      result = this.player.avatar.name;
    } else {
      result = this.player.name;
    }
    return result;
  }

  hasTotalBetChip() : boolean {
    let result : boolean = false;
    if ( PlayerComponent.getTotalBetChipValue(this.player) > 0 ) {
      result = true;
    }
    return result;
  }

  static getTotalBetChipValue(player : IPlayer) : number {
    let result : number = player.qtyLastMinimumBlind;
    return result;
  }

  getTotalBetChip() : string {
    return '(-$' + PlayerComponent.getTotalBetChipValue(this.player) + ')';
  }

  static getTotalChipValue(player : IPlayer) : number {
    let result : number = player.qtyPockerChip10*10 + player.qtyPockerChip20*20 + player.qtyPockerChip100*100;
    return result;
  }

  getTotalChip() : string {
    return '$' + PlayerComponent.getTotalChipValue(this.player);
  }

  static setPlaying(player : IPlayer, qtyMinimumBet : number) {
    player.staPlaying = true;

    setTimeout(() => { player.emitter.emit({ action: DeckAction.Refresh }); }, 10000);

    if ( player.name === undefined ) {
      player.qtyLastMinimumBlind = PlayerComponent.makeBetSimulator( player, qtyMinimumBet );

      setTimeout(() => { 
        player.staPlaying = false;
        player.emitter.emit({ action: DeckAction.Check }); }, 10000);

    }
  }

  static unsetPlaying(player : IPlayer, qtyMinimumBet : number) {
    
    player.qtyLastMinimumBlind = qtyMinimumBet;
    
    setTimeout(() => { 
      player.staPlaying = false;
      player.emitter.emit({ action: DeckAction.Check }); }, 10000);
  }

  getPlaying() : boolean{
    return this.player.staPlaying;
  }

  makeBet(qtyMinimumBet : number, qtyPockerChip10 : number, qtyPockerChip20 : number, qtyPockerChip100 : number ): number {
    let result : number = 0;

    this.player.qtyLastMinimumBlind = qtyPockerChip10 * 10 + qtyPockerChip20 * 20 + qtyPockerChip100 * 100;

    return result;
  }
  static markHandRisk(player : IPlayer) {
    player.handRisk = Math.floor(Math.random() * 4);
  }

  static makeBetSimulator(player : IPlayer, qtyMinimumBet : number): number {
    let result : number = 0;
    
    // Created an algorithm to make a decision how much to bet
    PlayerComponent.markHandRisk(player);

    let weightHand : number = HandCheck.hankCheck(player.listCard);

    if (weightHand >= player.handRisk ) {
      if ( qtyMinimumBet >= PlayerComponent.getTotalChipValue(player) ) {
        result = qtyMinimumBet;
      } else if ( qtyMinimumBet*2 <= PlayerComponent.getTotalChipValue(player) ) {
        result = qtyMinimumBet*2;
      }
    } else {
      result = qtyMinimumBet; 
    }

    return result;
  }

  static createPlayer(index : number, playerName : string, avatar? : IAvatar, qtyPockerChip10? : number, qtyPockerChip20? : number, qtyPockerChip100? : number) : IPlayer {
    let player : IPlayer = <IPlayer>{};
    player.name = playerName;
    player.listCard = [];
    player.avatar = avatar;
    player.qtyPockerChip10 = qtyPockerChip10;
    player.qtyPockerChip20 = qtyPockerChip20;
    player.qtyPockerChip100 = qtyPockerChip100;
    return player;
  }

  getListCard() : ICard[] {
    let result : ICard[] = this.player.listCard;
    return result;
  }

}