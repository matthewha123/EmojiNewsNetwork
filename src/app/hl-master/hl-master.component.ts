import { Component, ViewChild, OnInit, Input } from '@angular/core';
import { HeadLine } from '../headline';
import { Translation } from '../translations/translation';
import { TranslationService } from '../translations/translation.service';
import { TranslationsMasterComponent } from '../translations/translations-master/translations-master.component';
import { ActivatedRoute } from '@angular/router';
import { HeadlineService } from '../headline.service';

@Component({
  selector: 'app-hl-master',
  templateUrl: './hl-master.component.html',
  styleUrls: ['./hl-master.component.css']
})
export class HlMasterComponent implements OnInit {
  title = 'Emoji News Network';
  activeHeadLine: HeadLine;
  hl_received = false;
  headlines: HeadLine[];

  @ViewChild(TranslationsMasterComponent) tMaster;

  hl_toDisplayID: number;
  backID: number;
  forwardID: number;
  constructor(private TS: TranslationService, private route: ActivatedRoute, private HS: HeadlineService) { 
  	this.hl_toDisplayID = +this.route.snapshot.paramMap.get('id');
  }

  ngOnInit() {
  	this.getHeadlines();
  	this.route.paramMap.subscribe(() => {
  		 this.hl_toDisplayID = +this.route.snapshot.paramMap.get('id');
  		 this.getHeadlines();
  	});

  }

  onEmojiSubmit(e) {
    console.log(e);
    this.TS.putTranslation(new Translation(-1, e, 0, 'matthew', 'today'), this.headlines[this.hl_toDisplayID].id)
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
        this.getIDs();
      });
}
	getIDs() {
	if(this.headlines) {
  		this.backID = this.hl_toDisplayID != 0 ? this.hl_toDisplayID - 1 : this.headlines.length - 1;
  		this.forwardID = this.hl_toDisplayID != this.headlines.length-1 ? this.hl_toDisplayID + 1 : 0;
  	} else {
  		this.backID = this.hl_toDisplayID;
  		this.forwardID = this.hl_toDisplayID;
  	}
  	this.hl_received = true;
	}

}

