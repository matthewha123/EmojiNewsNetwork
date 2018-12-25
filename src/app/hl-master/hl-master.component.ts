import { Component, ViewChild, OnInit, Input } from '@angular/core';
import { HeadLine } from '../headline';
import { Translation } from '../translations/translation';
import { TranslationService } from '../translations/translation.service';
import { TranslationsMasterComponent } from '../translations/translations-master/translations-master.component';
import { ActivatedRoute } from '@angular/router';
import { HeadlineService } from '../headline.service';
import { LoginService } from '../login/login.service';

@Component({
  selector: 'app-hl-master',
  templateUrl: './hl-master.component.html',
  styleUrls: ['./hl-master.component.css']
})
export class HlMasterComponent implements OnInit {
  orderingIDX: number;

  @ViewChild(TranslationsMasterComponent) tMaster;

  hl_toDisplayID: number;
  // backID: number;
  // forwardID: number;
  // headline: HeadLine;

  emojiString: string = '';

  constructor(private TS: TranslationService, private route: ActivatedRoute, private HS: HeadlineService, private LS: LoginService) { 
  	this.hl_toDisplayID = +this.route.snapshot.paramMap.get('id');
  }

  get headline() {
    if(this.HS.IsHeadlineLoaded(this.hl_toDisplayID)) return this.HS.getHeadline(this.hl_toDisplayID);
    else return undefined;
  }

  get backID() {
    if(this.headline) return this.HS.getAdjacentIDs(this.hl_toDisplayID)['back'];
    else return undefined;
  }
  get forwardID() {
    if(this.headline) return this.HS.getAdjacentIDs(this.hl_toDisplayID)['forward'];
    else return undefined;
  }

  ngOnInit() {
  	this.route.paramMap.subscribe(() => {
  		 this.hl_toDisplayID = +this.route.snapshot.paramMap.get('id');
  		 if(this.HS.IsHeadlineLoaded(this.hl_toDisplayID)) {

  		 	console.log(this.headline);
  		 }
  		 else {
  		 	console.log("get this shit", this.hl_toDisplayID);
        this.HS.getMissingHeadline(this.hl_toDisplayID);
  		 }

  	});

  }

  onEmojiSubmit() {
    console.log("EMOJI MODEL", this.emojiString);
    let user = 'anon';
    let uid = -1;

    let loggedInUser = this.LS.getUser();
    if(loggedInUser != undefined) {
      user = loggedInUser["username"];
      uid = loggedInUser["id"];
    }
 
    this.TS.putTranslation(new Translation(-1, this.emojiString, 0, user, uid, 'today', this.hl_toDisplayID))
      .subscribe(trans => {
        console.log("Translation just sent was: ", trans);
        this.tMaster.getTranslations();
      });
    this.tMaster.getTranslations();
  }


	getIDs() {

	}

}

