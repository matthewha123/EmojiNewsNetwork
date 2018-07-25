import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { AngularFontAwesomeModule } from 'angular-font-awesome';
import { StorageServiceModule } from 'angular-webstorage-service';


import { AppComponent } from './app.component';
import { NavbarComponent } from './navbar/navbar.component';
import { HlMovementComponent } from './hl-movement/hl-movement.component';
import { HeadlineViewComponent } from './headline-view/headline-view.component';
import { HlInfoComponent } from './hl-info/hl-info.component';
import { EmojiPickerModule } from './emoji-picker/emoji-picker.module';
import { EmojiInputComponent } from './emoji-input/emoji-input.component';
import { TranslationComponent } from './translations/translation/translation.component';
import { TranslationsMasterComponent } from './translations/translations-master/translations-master.component';
import { HlMasterComponent } from './hl-master/hl-master.component';
import { AppRoutingModule } from './/app-routing.module'
import { RouterModule } from '@angular/router';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    HlMovementComponent,
    HeadlineViewComponent,
    HlInfoComponent,
    EmojiInputComponent,
    TranslationComponent,
    TranslationsMasterComponent,
    HlMasterComponent,
    PageNotFoundComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AngularFontAwesomeModule,
    EmojiPickerModule,
    AppRoutingModule,
    StorageServiceModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
