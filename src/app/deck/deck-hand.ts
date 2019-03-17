import { ICard } from 'src/app/model/icard';

export class HandCheck {
  static HANDCHECK_FLUSH : number = 7;
  static HANDCHECK_STRAIGHT : number = 6;
  static HANDCHECK_FOURKIND : number = 5;
  static HANDCHECK_FULLHOUSE : number = 4;
  static HANDCHECK_THREEKIND : number = 3;
  static HANDCHECK_TWOPAIRS : number = 2;
  static HANDCHECK_ONEPAIR : number = 1;
  
  static hankCheck(listCard : ICard[]) : number {
    let result : number = 0;
    
    if (HandCheck.checkFlush(listCard)) {
      result = HandCheck.HANDCHECK_FLUSH;
    } else if (HandCheck.checkStraight(listCard)) {
      result = HandCheck.HANDCHECK_STRAIGHT;
    } else if (HandCheck.checkFourKind(listCard)) {
      result = HandCheck.HANDCHECK_FOURKIND;
    } else if (HandCheck.checkFullHouse(listCard)) {
      result = HandCheck.HANDCHECK_FULLHOUSE;
    } else if (HandCheck.checkThreeKind(listCard)) {
      result = HandCheck.HANDCHECK_THREEKIND;
    } else if (HandCheck.checkTwoPairs(listCard)) {
      result = HandCheck.HANDCHECK_TWOPAIRS;
    } else if (HandCheck.checkOnePair(listCard)) {
      result = HandCheck.HANDCHECK_ONEPAIR;
    }
    
    return result;
  }

  static checkFlush( listCard : ICard[] ) : boolean {
    let result : boolean = true;
    for ( let idxCard : number = 1; idxCard < listCard.length; idxCard++ ) {
      if ( listCard[idxCard].suit !== listCard[0].suit ) {
        result = false;
        break;
      }
    }
    return result;
  }

  static checkStraight( listCard : ICard[] ) : boolean {
    let result : boolean = true;

    let listCardSorted: ICard[] = listCard.sort( ( cardA : ICard, cardB : ICard) => {
      return cardA.value - cardB.value;
    });

    let currentCard = listCardSorted[0];

    for ( let idxCard : number = 1; idxCard < listCard.length; idxCard++ ) {
      if ( listCardSorted[idxCard].value - currentCard.value !== 1 ) {
        result = false;
        break;
      } else {
        currentCard = listCardSorted[idxCard];
      }
    }
    return result;
  }

  static checkFourKind( listCard : ICard[] ) : boolean {
    let result : boolean = false;

    let listCardSorted: ICard[] = listCard.sort( ( cardA : ICard, cardB : ICard) => {
      return cardA.value - cardB.value;
    });

    let currentCard = listCardSorted[0];

    let qtyKind : number = 0;
    for ( let idxCard : number = 1; idxCard < listCard.length; idxCard++ ) {
      if ( listCardSorted[idxCard].value === currentCard.value ) {
        qtyKind++;
      } else {
        currentCard = listCardSorted[idxCard];
      }
    }

    if (qtyKind === 4) {
      result = true;
    }
    return result;
  }

  static checkFullHouse( listCard : ICard[] ) : boolean {
    let result : boolean = false;

    return result;
  }

  static checkThreeKind( listCard : ICard[] ) : boolean {
    let result : boolean = false;

    let listCardSorted: ICard[] = listCard.sort( ( cardA : ICard, cardB : ICard) => {
      return cardA.value - cardB.value;
    });

    let currentCard = listCardSorted[0];

    let qtyKind : number = 0;
    for ( let idxCard : number = 1; idxCard < listCard.length; idxCard++ ) {
      if ( listCardSorted[idxCard].value === currentCard.value ) {
        qtyKind++;
        if (qtyKind === 3) {
          result = true;
          break;
        }
      } else {
        currentCard = listCardSorted[idxCard];
        qtyKind = 0;
      }
    }
    return result;
  }

  static checkTwoPairs( listCard : ICard[] ) : boolean {
    let result : boolean = false;
    let listCardSorted: ICard[] = listCard.sort( ( cardA : ICard, cardB : ICard) => {
      return cardA.value - cardB.value;
    });

    let currentCard = listCardSorted[0];

    let qtyFirstPar : number = 0;
    let qtySecondPar : number = 0;
    for ( let idxCard : number = 1; idxCard < listCard.length; idxCard++ ) {
      if ( listCardSorted[idxCard].value === currentCard.value ) {
        if (qtyFirstPar !== 2) {
          qtyFirstPar++;
        } else {
          qtySecondPar++;
        }
      } else {
        currentCard = listCardSorted[idxCard];
      }
    }
    if (qtyFirstPar === 2 && qtySecondPar === 2) {
      result = true;
    }
    return result;
  }

  static checkOnePair( listCard : ICard[] ) : boolean {
    let result : boolean = false;
    let listCardSorted: ICard[] = listCard.sort( ( cardA : ICard, cardB : ICard) => {
      return cardA.value - cardB.value;
    });

    let currentCard = listCardSorted[0];

    let qtyFirstPar : number = 0;
    for ( let idxCard : number = 1; idxCard < listCard.length; idxCard++ ) {
      if ( listCardSorted[idxCard].value === currentCard.value ) {
        qtyFirstPar++;
      } else {
        currentCard = listCardSorted[idxCard];
      }
    }
    if (qtyFirstPar === 2) {
      result = true;
    }
    return result;
  }
}