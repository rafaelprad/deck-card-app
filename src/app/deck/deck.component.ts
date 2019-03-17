import { Component, ChangeDetectorRef, NgZone, EventEmitter } from '@angular/core';
import { IDeck } from '../model/ideck';
import { ICard, ECardSuit as ECardSuit } from '../model/icard';
import { LoginService } from '../login/login.service';
import { IPlayer } from '../model/iplayer';
import { PlayerComponent } from '../common/player/player.component';
import { IAvatar } from '../model/iavatar';
import { CardComponent } from '../common/card/card.component';
import { BaseComponent } from '../common/base.component';
import { FormGroup } from '@angular/forms';
import { IPlay } from '../model/iplay';
import { Router } from '@angular/router';
import { LoginComponent } from '../login/login.component';
import { DeckAction } from './deck.enum';

@Component({
  selector: 'deck',
  templateUrl: './deck.component.html',
  styleUrls: ['./deck.component.css']
})
export class DeckComponent extends BaseComponent{

  private numMaxCardForPlayer : number = 5;

  deck : IDeck;

  playerUser : IPlayer;

  currentPlayer : IPlayer;

  idxCurrentPlayer : number;

  listAvatar : IAvatar[];

  emitter : EventEmitter<{ action: DeckAction, data? : any }>;

  constructor(
    zone: NgZone,
    changeDetectorRef: ChangeDetectorRef,
    private loginService: LoginService,
    private router: Router
  ) {
    super(zone, changeDetectorRef);
  }

  // Angular circle events live

  ngOnInit() {
    this.initialize();
  }

  ngAfterViewInit() {
    setTimeout(() => { this.dealForNextPlayer(); }, 10000);
  }

  ngOnDestroy() {
    this.changeDetectorRef.detach();
  }

  // Routes

  static getRouteName(useSlash: boolean = false): string {
    return (useSlash ? '/' : '') + 'deck';
  }

  // Methods

  initialize() {
    
    if ( this.deck === undefined ) {
      this.deck = <IDeck>{};
    }

    this.emitter = new EventEmitter<{ action: DeckAction, data? : any }>()
    this.emitter.subscribe( ( data : { action: DeckAction, data? : any } ) => {

      if (data.action === DeckAction.Check) {
        this.dealForNextPlayer();
      } else if (data.action === DeckAction.Raise) {
        this.raiseForNextPlayer();
      } else if (data.action === DeckAction.Fold) {
        this.foldForNextPlayer();
      } else if (data.action === DeckAction.Refresh) {
        this.onRefresh();
      }
    });

    this.loadAvatars();
    this.loadPlayers();
    this.loadCards();

    this.shuffleCards();

    this.dealAll5CardsForEachPlayer();
  }

  createAvatar(index : number, name : string) : IAvatar {
    let avatar : IAvatar = <IAvatar>{};
    avatar.index = index;
    avatar.name = name;
    return avatar;
  }

  loadAvatars() {
    this.listAvatar = [];

    this.listAvatar.push(this.createAvatar(1, 'Julie'));
    this.listAvatar.push(this.createAvatar(2, 'John'));
    this.listAvatar.push(this.createAvatar(3, 'Roberta'));
    this.listAvatar.push(this.createAvatar(4, 'Gabriel'));
    this.listAvatar.push(this.createAvatar(5, 'Amber'));
    this.listAvatar.push(this.createAvatar(6, 'Miguel'));
    this.listAvatar.push(this.createAvatar(7, 'Ben'));
    this.listAvatar.push(this.createAvatar(8, 'Luiza'));
    this.listAvatar.push(this.createAvatar(9, 'Marie'));
  }

  getAvatar() : IAvatar {
    let result : IAvatar;
    const idxAvatarPick = Math.floor(Math.random() * this.listAvatar.length);
    result = this.listAvatar[idxAvatarPick];
    this.listAvatar.splice(idxAvatarPick, 1);
    return result;
  }

  loadPlayers() {
    this.deck.listPlayer = [];

    const play : IPlay = this.loginService.getPlay();
    this.deck.qtyMinimumBet = play.qtyMinimumBet;

    // Reading current player user
    let playerUser = play.player;

    // Adding anothers players for the desk
    let playerAvatar1 : IPlayer = PlayerComponent.createPlayer(0, undefined, this.getAvatar(), playerUser.qtyPockerChip10, playerUser.qtyPockerChip20, playerUser.qtyPockerChip100);
    playerAvatar1.emitter = this.emitter;
    this.deck.listPlayer.push(playerAvatar1);
    let playerAvatar2 : IPlayer = PlayerComponent.createPlayer(1, undefined, this.getAvatar(), playerUser.qtyPockerChip10, playerUser.qtyPockerChip20, playerUser.qtyPockerChip100);
    playerAvatar2.emitter = this.emitter;
    this.deck.listPlayer.push(playerAvatar2);
    let playerAvatar3 : IPlayer = PlayerComponent.createPlayer(2, undefined, this.getAvatar(), playerUser.qtyPockerChip10, playerUser.qtyPockerChip20, playerUser.qtyPockerChip100);
    playerAvatar3.emitter = this.emitter;
    this.deck.listPlayer.push(playerAvatar3);
    
    let playerAvatar4 : IPlayer = PlayerComponent.createPlayer(3, undefined, this.getAvatar(), playerUser.qtyPockerChip10, playerUser.qtyPockerChip20, playerUser.qtyPockerChip100);
    playerAvatar4.emitter = this.emitter;
    this.deck.listPlayer.push(playerAvatar4);
    //
    // Adding your personal player
    playerUser.avatar = this.getAvatar();
    playerUser.index = 4;
    playerUser.emitter = this.emitter;
    this.deck.listPlayer.push(playerUser);
    //
    let playerAvatar5 : IPlayer = PlayerComponent.createPlayer(5, undefined, this.getAvatar(), playerUser.qtyPockerChip10, playerUser.qtyPockerChip20, playerUser.qtyPockerChip100);
    playerAvatar5.emitter = this.emitter;
    this.deck.listPlayer.push(playerAvatar5);

    this.playerUser = playerUser;
  } 

  getPlayer(index : number) : IPlayer {
    let result : IPlayer;
    if ( this.deck !== undefined &&
      this.deck.listPlayer !== undefined &&
      index < this.deck.listPlayer.length ) {
      result = this.deck.listPlayer[index];
    }
    return result;
  }

  hasPlayer(index : number) : boolean {
    let result : boolean = false;
    if ( this.deck !== undefined &&
      this.deck.listPlayer !== undefined &&
      index < this.deck.listPlayer.length ) {
      result = true;
    }
    return result;
  }
  
  loadCards() {
    this.deck.listCard = [];

    for (let idxCard = 1; idxCard <= 13; idxCard++ ) {

      let cardClub : ICard = this.createCard( idxCard, ECardSuit.Club );
      this.deck.listCard.push(cardClub);
      let cardDiamond : ICard = this.createCard( idxCard, ECardSuit.Diamond );
      this.deck.listCard.push(cardDiamond);
      let cardHearth : ICard = this.createCard( idxCard, ECardSuit.Hearth );
      this.deck.listCard.push(cardHearth);
      let cardSpade : ICard = this.createCard( idxCard, ECardSuit.Spade );
      this.deck.listCard.push(cardSpade);
    }

    this.deck.listCard.sort();
  }

  createCard(value : number, suit : ECardSuit) : ICard {
    let card : ICard = <ICard>{};
    card.value = value;
    card.symbol = CardComponent.decodeSuitCard(value);
    card.suit = suit;
    if ( card.suit === ECardSuit.Spade || card.suit === ECardSuit.Club ) {
      card.color = 'black';
    } else {
      card.color = 'red';
    }
    return card;
  }

  shuffleCards() {
    let qtyCards : number = this.deck.listCard.length;

    let idxCardPick : number;

    let listCardsShuffled : ICard[] = [];

    while (0 !== qtyCards) {
  
      idxCardPick = Math.floor(Math.random() * qtyCards);
      qtyCards--;

      listCardsShuffled.push(this.deck.listCard[idxCardPick]);
      this.deck.listCard.splice(idxCardPick, 1);
    }
  
    this.deck.listCard = listCardsShuffled;
  }

  dealOneCard() : ICard{
    return this.deck.listCard.shift();
  }

  dealAll5CardsForEachPlayer() : void {

    for( let idxCardForPlayer : number = 0; idxCardForPlayer < this.numMaxCardForPlayer; idxCardForPlayer++ ) {
      for( let idxPlayer : number = 0; idxPlayer < this.deck.listPlayer.length; idxPlayer++ ) {
        let cardPlayer = this.dealOneCard();
        this.deck.listPlayer[idxPlayer].listCard.push(cardPlayer);
      }
    }

    this.render();
  }

  canPlay() : boolean {
    let result : boolean = false;
    if ( this.currentPlayer !== undefined &&
      this.currentPlayer.index === this.playerUser.index ) {
      result = true;
    }
    return result;
  }

  dealForNextPlayer() {
    if ( this.idxCurrentPlayer === undefined ) {
      this.idxCurrentPlayer = 0;
    } else {
      this.idxCurrentPlayer++;
    }

    if ( this.idxCurrentPlayer < this.deck.listPlayer.length ) {
      this.currentPlayer = this.deck.listPlayer[this.idxCurrentPlayer];

      PlayerComponent.setPlaying(this.currentPlayer, this.deck.qtyMinimumBet);
    }
  }

  raiseForNextPlayer() {
  }

  foldForNextPlayer() {
  }

  onBtnCheckForCurrentPlayer() {
    if (this.canPlay()) {
      let qtyMinimumBlindToBet : number = 0;
      
      if (this.playerUser.qtyPockerChip10ToBet !== undefined &&
        this.playerUser.qtyPockerChip10ToBet > 0 ) {
        qtyMinimumBlindToBet += this.playerUser.qtyPockerChip10ToBet * 10;
      }
      if (this.playerUser.qtyPockerChip20ToBet !== undefined &&
        this.playerUser.qtyPockerChip20ToBet > 0 ) {
        qtyMinimumBlindToBet += this.playerUser.qtyPockerChip20ToBet * 20;
      }
      if (this.playerUser.qtyPockerChip100ToBet !== undefined &&
        this.playerUser.qtyPockerChip100ToBet > 0 ) {
        qtyMinimumBlindToBet += this.playerUser.qtyPockerChip100ToBet * 100;
      }

      if ( qtyMinimumBlindToBet >= this.deck.qtyMinimumBet ) {
        PlayerComponent.unsetPlaying(this.currentPlayer, qtyMinimumBlindToBet);
      }
    }
  }

  onBtnRaiseForCurrentPlayer() {
    if (this.canPlay()) {
      
    }
  }

  onBtnExitGame() {
    this.loginService.clear();
    this.router.navigate([LoginComponent.getRouteName(true)]);
  }

  onRefresh() {

    this.render();
  }
}
