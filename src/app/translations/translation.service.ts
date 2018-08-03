import { Injectable } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';
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


	putTranslation(trans: Translation): Observable<any> {
    console.log("Sending this data: ", trans);
		return this.http.post(this.translationURL, trans, httpOptions)
      .pipe(
          catchError(this.handleError)
        );
	}

  handleError(errMSG: HttpErrorResponse) {
    return throwError(
        'Something bad happened; please try again later.');
  }

  vote(trans_id: number, mod: number): Observable<any> {
    let data = {trans_id: trans_id, modifier: mod};
    return this.http.post(this.translationURL+"/vote", data, httpOptions)
      .pipe(
        catchError(this.handleError)
          )
  }
}
