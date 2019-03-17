import { Routes } from '@angular/router';
import { DeckComponent } from './deck.component';
import { LoginGuard } from '../login/login.guard';

export const deckRoutes: Routes = [
  {
    path: DeckComponent.getRouteName(),
    component: DeckComponent,
    canActivate: [LoginGuard]
  }
];
