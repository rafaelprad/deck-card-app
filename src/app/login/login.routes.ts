import { Routes } from '@angular/router';
import { LoginComponent } from './login.component';

export const loginRoutes: Routes = [
  {
    path: LoginComponent.getRouteName(),
    component: LoginComponent
  }
];
