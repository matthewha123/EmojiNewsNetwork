import { Component, OnInit, Input } from '@angular/core';
import { TranslationService } from '../translation.service';
import { Translation } from '../translation';

@Component({
  selector: 'app-translations-master',
  templateUrl: './translations-master.component.html',
  styleUrls: ['./translations-master.component.css']
})
export class TranslationsMasterComponent implements OnInit {

	@Input() headline: string;
	translations: Translation[];
  constructor(private TS: TranslationService) { }

  ngOnInit() {
  	this.getTranslations();
  }
  ngOnChanges() {
  	this.getTranslations();
  }

  getTranslations() {
  	this.TS.getTranslations(this.headline)
  		.subscribe(translations => this.translations = translations);
  	// this.translations=this.TS.getTranslations(this.headline);
  	// console.log(this.translations);
  }
}