import { Injectable } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';
import { DummyTranslations } from "./dummy-translations";
import { Translation } from "./translation"
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { catchError, map, tap, retry } from 'rxjs/operators';

const httpOptions = {
    headers: new HttpHeaders( {
        'Content-Type':  'application/json'
      })
  };

@Injectable({
  providedIn: 'root'
})

export class TranslationService {
  translationURL = 'http://localhost:3000/api/enn/translation'
  constructor(private http: HttpClient) { }

  getTranslations(hl_id:number): Observable<any>{
    console.log("getting translations!");
  	return this.http.get(this.translationURL+'/'+hl_id)
      .pipe(
            retry(3),
           catchError(this.handleError))
  }
//     getTranslations(hl:string): Translation[]{
// 	  	console.log("yo");
// 	  	return DummyTranslations[hl];
//   }

	putTranslation(trans: Translation, hl_id: number): Observable<any> {
    let data = Object.assign({hl_id: hl_id}, trans);
    console.log("Sending this data: ", data);
		return this.http.post(this.translationURL, data, httpOptions)
      .pipe(
          catchError(this.handleError)
        );
	}

  handleError(errMSG: HttpErrorResponse) {
    return throwError(
        'Something bad happened; please try again later.');
  }

  vote(trans_id: number, hl_id: number, mod: number): Observable<any> {
    let data = {trans_id: trans_id, hl_id: hl_id, modifier: mod};
    return this.http.post(this.translationURL+"/vote", data, httpOptions)
      .pipe(
        catchError(this.handleError)
          )
  }
}
