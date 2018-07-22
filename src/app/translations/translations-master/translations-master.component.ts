import { Component, OnInit, Input } from '@angular/core';
import { TranslationService } from '../translation.service';
import { Translation } from '../translation';

@Component({
  selector: 'app-translations-master',
  templateUrl: './translations-master.component.html',
  styleUrls: ['./translations-master.component.css']
})
export class TranslationsMasterComponent implements OnInit {

	@Input() headline: object;
	translations: Translation[];
  constructor(private TS: TranslationService) { }

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
}
