import { Component, ChangeDetectorRef, NgZone } from '@angular/core';
import { LoginService } from './login.service';
import { IPlayer } from '../model/iplayer';
import { BaseComponent } from '../common/base.component';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { DeckComponent } from '../deck/deck.component';
import { Router } from '@angular/router';
import { IAvatar } from '../model/iavatar';

@Component({
  selector: 'login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent extends BaseComponent {

  player : IPlayer;

  qtyMinimumBet : number;

  formPlay: FormGroup;

  staCheckForm : boolean = false;

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
    this.player = <IPlayer>{};
    this.player.listCard = [];

    this.createForm();
  }

  ngOnDestroy() {
    this.changeDetectorRef.detach();
  }

  // Routers

  static getRouteName(useSlash: boolean = false): string {
    return (useSlash ? '/' : '') + 'login';
  }

  // Create form with validators
  createForm() {

    this.formPlay = new FormGroup({
      namePlayer: new FormControl('', Validators.required),
      qtyPockerChip10Player: new FormControl('', Validators.required),
      qtyPockerChip20Player: new FormControl('', Validators.required),
      qtyPockerChip100Player: new FormControl('', Validators.required),
      qtyMinimumBet: new FormControl('', Validators.required),
    });
  }

  // Methods

  onBtnLetsPlay() {

    if (!this.formPlay.invalid) {
      this.staCheckForm = false;

      this.loginService.setPlayData(this.player, this.qtyMinimumBet);
      this.router.navigate([DeckComponent.getRouteName(true)]);
    } else {

      this.staCheckForm = true;
    }
  }
}
