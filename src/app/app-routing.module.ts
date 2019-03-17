import { NgModule } from '@angular/core';
import { Routes, RouterModule, ExtraOptions } from '@angular/router';
import { loginRoutes } from './login/login.routes';
import { LoginComponent } from './login/login.component';
import { deckRoutes } from './deck/deck.routes';

const routes: Routes = [
  { path: '', redirectTo: LoginComponent.getRouteName(true), pathMatch: 'full' },

  ...loginRoutes,
  ...deckRoutes
];

const config: ExtraOptions = {
  enableTracing: false,
  useHash: false
};

@NgModule({
  imports: [RouterModule.forRoot(routes, config)],
  exports: [RouterModule]
})
export class AppRoutingModule { }