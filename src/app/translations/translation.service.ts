import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { DummyTranslations } from "./dummy-translations";
import { Translation } from "./translation"

@Injectable({
  providedIn: 'root'
})
export class TranslationService {

  constructor() { }

  getTranslations(hl:string): Observable<Translation[]>{
  	console.log("yo");
  	return of(DummyTranslations[hl]);
  }
//     getTranslations(hl:string): Translation[]{
// 	  	console.log("yo");
// 	  	return DummyTranslations[hl];
//   }

	putTranslation(trans: Translation, hl:string): Observable<Translation[]> {
		DummyTranslations[hl].push(trans);
		console.log(DummyTranslations[hl]);
		return of(DummyTranslations[hl]);
	}
}
