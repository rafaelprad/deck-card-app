import { Component, ChangeDetectorRef } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { LoginService } from './login/login.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  constructor(
    private changeDetectorRef: ChangeDetectorRef,
    private titleService : Title,
    private loginService: LoginService,
  ) {

  }

  // Angular circle events live

  ngOnInit() {
    this.titleService.setTitle('Deck of card');
  }

  ngOnDestroy() {
    this.changeDetectorRef.detach();
  }

  // Styles definitions

  getClass() {
    let result: string = 'full-content';

    result += ' theme-default';

    return result;
  }

}
