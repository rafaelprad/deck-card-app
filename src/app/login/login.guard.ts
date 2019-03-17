import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, NavigationEnd, NavigationStart, Router } from '@angular/router';
import { LoginComponent } from './login.component';
import { LoginService } from './login.service';

@Injectable()
export class LoginGuard implements CanActivate {
  constructor(private loginService: LoginService, 
    private router: Router) {
  }

  canActivate(route: ActivatedRouteSnapshot) {
    if (this.loginService.isPlaying()) {
      return true;
    } else {
      this.router.navigate([LoginComponent.getRouteName()]);
    }
  }

}