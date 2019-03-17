import { FlexLayoutModule } from '@angular/flex-layout';
import { BrowserModule, Title } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginService } from './login/login.service';
import { LoginComponent } from './login/login.component';
import { DeckComponent } from './deck/deck.component';
import { MaterialModule } from './third-party/material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { PlayerComponent } from './common/player/player.component';
import { CardComponent } from './common/card/card.component';
import { LoginGuard } from './login/login.guard';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    DeckComponent,
    CardComponent,
    PlayerComponent
  ],
  imports: [
    CommonModule,
    BrowserModule,
    BrowserAnimationsModule,
    FlexLayoutModule,
    AppRoutingModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [
    Title,
    LoginService,
    LoginGuard
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
