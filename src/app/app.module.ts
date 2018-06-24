import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { AngularFontAwesomeModule } from 'angular-font-awesome';

import { AppComponent } from './app.component';
import { NavbarComponent } from './navbar/navbar.component';
import { HlMovementComponent } from './hl-movement/hl-movement.component';
import { HeadlineViewComponent } from './headline-view/headline-view.component';
import { HlInfoComponent } from './hl-info/hl-info.component';
import { EmojiPickerModule } from './emoji-picker/emoji-picker.module'

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    HlMovementComponent,
    HeadlineViewComponent,
    HlInfoComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AngularFontAwesomeModule,
    EmojiPickerModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
