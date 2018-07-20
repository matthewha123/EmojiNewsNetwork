import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { DummyTranslations } from "./dummy-translations";
import { Translation } from "./translation"

@Injectable({
  providedIn: 'root'
})
export class TranslationService {
  translationURL = 'http://localhost:3000//api/enn/translation'
  constructor() { }

  getTranslations(hl:string): Observable<Translation[]>{
  	console.log("yo");
  	return of(DummyTranslations[hl]);
  }
//     getTranslations(hl:string): Translation[]{
// 	  	console.log("yo");
// 	  	return DummyTranslations[hl];
//   }

	putTranslation(trans: Translation, hl:string): Observable<any> {
		return
	}
}
