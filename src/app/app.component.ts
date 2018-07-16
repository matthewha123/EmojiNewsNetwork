import { Component, ViewChild } from '@angular/core';
import { HeadLine } from './headline';
import { Translation } from './translations/translation';
import { TranslationService } from './translations/translation.service';
import { TranslationsMasterComponent } from './translations/translations-master/translations-master.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Emoji News Network';
  activeHeadLine: HeadLine;
  hl_received = false;

  @ViewChild(TranslationsMasterComponent) tMaster;


  constructor(private TS: TranslationService) {}

  onEmojiSubmit(e) {
    console.log(e);
    this.TS.putTranslation(new Translation(e, 57, 'matthew', 'today'), this.activeHeadLine.txt);
    this.tMaster.getTranslations();
  }

  onHeadLineChange(newHeadLine: HeadLine) {
    this.hl_received = true;
    this.activeHeadLine=newHeadLine;
    console.log(newHeadLine);
  }
}
