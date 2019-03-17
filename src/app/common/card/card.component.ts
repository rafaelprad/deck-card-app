import { Component, ChangeDetectorRef, Input } from '@angular/core';
import { ICard, ECardSuit } from '../../model/icard';
import { IPlayer } from 'src/app/model/iplayer';
import { SafeUrl, DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css']
})
export class CardComponent {

  private pathFilenameSuit : string = "../../assets/images/";
  private extensionFilenameSuit : string = ".png";

  @Input()
  card : ICard;

  @Input()
  ownerPlayer : IPlayer;

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

  // Rules to display value of card

  canShowValueOfCard() : boolean {
    let result : boolean = false;
    if ( this.ownerPlayer.name !== undefined ) {
      result = true;
    }
    return result;
  }

  // Card definitions   

  static decodeSuitCard(value : number) : string {
    let suit : string;

    switch( value ) {
      case 1 :
        suit = 'A';
        break;
      case 11 :
        suit = 'J';
        break;
      case 12 :
        suit = 'K';
        break;
      case 13 :
        suit = 'Q';
        break;
      default :
        suit = '' + value;
    }
    return suit;
  }

  getUrlSuitFilename() : SafeUrl {
    let result : string = this.pathFilenameSuit + this.card.suit.toString() + this.extensionFilenameSuit;
    return this.sanitizer.bypassSecurityTrustUrl(result);
  }

  getStyle() {
    return { color : this.card.color };
  }

}