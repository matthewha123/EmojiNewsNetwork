import { Component, OnInit, Input } from '@angular/core';
import { TranslationService } from '../translation.service';
import { Translation } from '../translation';
import { LocalStorageService } from '../../local-storage.service';

@Component({
  selector: 'app-translations-master',
  templateUrl: './translations-master.component.html',
  styleUrls: ['./translations-master.component.css']
})
export class TranslationsMasterComponent implements OnInit {

	@Input() headline: object;
	translations: Translation[];
  constructor(private TS: TranslationService, private LSS: LocalStorageService) { }

  ngOnInit() {
  	this.getTranslations();
  }
  ngOnChanges() {
    console.log("Current Headline In TranslationMaster Is: ", this.headline['txt']);
  	this.getTranslations();
  }

  getTranslations() {
  	// this.TS.getTranslations(this.headline)
  	// 	.subscribe(translations => {
   //      this.translations = translations;
   //      console.log("Translations gotten from headline: ", this.translations);
   //    });
   this.TS.getTranslations(this.headline['id'])
     .subscribe(response => {
       console.log('getting translation response: ', response);
       this.translations = response["translations"];
     })
  }

  onVote(voteData) {
    console.log("vote data", voteData);

    let storageKey = 'vote'+'trans:'+voteData['trans_id']+'hl:'+this.headline['id'];
    let storageVal = voteData['modifier'] == 1 ? 'up' : 'down';
    if(voteData['noVote']) storageVal = "none";
    this.LSS.set(storageKey, storageVal);

    this.TS.vote(voteData['trans_id'], this.headline['id'], voteData['modifier'])
      .subscribe((resp) => {
        console.log("vote response ", resp);
        this.getTranslations();
      })
  }

  //TODO make a object that tells whether the current session/user has voted on a translation
    // keys are the translation id's, guarenteed uniqueness, pass it into the translation thing
    //if translated, immeditaely highlight the trnanslation, this way, the vote can only go down
}
