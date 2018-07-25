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
  orderingIDX: number;

  @ViewChild(TranslationsMasterComponent) tMaster;

  hl_toDisplayID: number;
  backID: number;
  forwardID: number;
  headline: HeadLine;

  constructor(private TS: TranslationService, private route: ActivatedRoute, private HS: HeadlineService) { 
  	this.hl_toDisplayID = +this.route.snapshot.paramMap.get('id');
  }

  ngOnInit() {
  	this.route.paramMap.subscribe(() => {
  		 this.hl_toDisplayID = +this.route.snapshot.paramMap.get('id');
  		 if(this.HS.IsHeadlineLoaded(this.hl_toDisplayID)) {
  		 	this.headline = this.HS.InternalGetHeadline(this.hl_toDisplayID);
  		 	let ids = this.HS.getAdjacentIDs(this.hl_toDisplayID);
  		 	this.backID = ids['back'];
  		 	this.forwardID = ids['forward'];
  		 	console.log(this.headline);
  		 }
  		 else {
  		 	console.log("get this shit", this.hl_toDisplayID);
  		 	this.hl_toDisplayID = undefined;
  		 }
  		 // this.getHeadlines();
  	});

  }

  onEmojiSubmit(e) {
    console.log(e);
    this.TS.putTranslation(new Translation(-1, e, 0, 'matthew', 'today'), this.hl_toDisplayID)
      .subscribe(trans => {
        console.log("Translation just sent was: ", trans);
        this.tMaster.getTranslations();
      });
    // this.tMaster.getTranslations();
  }


	getIDs() {

	}

}

