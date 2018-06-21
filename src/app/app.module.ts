import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { NavbarComponent } from './navbar/navbar.component';
import { HlMovementComponent } from './hl-movement/hl-movement.component';
import { HeadlineViewComponent } from './headline-view/headline-view.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    HlMovementComponent,
    HeadlineViewComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
