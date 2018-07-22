import { Component, ViewChild, OnInit } from '@angular/core';
import { HeadLine } from './headline';
import { Translation } from './translations/translation';
import { TranslationService } from './translations/translation.service';
import { TranslationsMasterComponent } from './translations/translations-master/translations-master.component';
import { HeadlineService } from './headline.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'Emoji News Network';
  activeHeadLine: HeadLine;
  hl_received = false;
  headlines: HeadLine[];

  @ViewChild(TranslationsMasterComponent) tMaster;


  constructor(private TS: TranslationService, private HS: HeadlineService) {}
  ngOnInit() {
    console.log("yolo");
    this.getHeadlines();
  }
  onEmojiSubmit(e) {
    console.log(e);
    this.TS.putTranslation(new Translation(-1, e, 0, 'matthew', 'today'), this.activeHeadLine.id)
      .subscribe(trans => {
        console.log("Translation just sent was: ", trans);
        this.tMaster.getTranslations();
      });
    // this.tMaster.getTranslations();
  }

  onHeadLineChange(newHeadLine: HeadLine) {
    this.hl_received = true;
    this.activeHeadLine=newHeadLine;
    // console.log(newHeadLine);
  }

  getHeadlines() {
    this.HS.getHeadlines()
      .subscribe(headlines => {
        this.headlines = headlines;
      });
  }
}
