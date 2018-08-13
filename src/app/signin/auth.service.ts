import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { catchError, map, tap, retry } from 'rxjs/operators';
import { Observable, of, throwError } from 'rxjs';

const httpOptions = {
    headers: new HttpHeaders( {
        'Content-Type':  'application/json'
      })
  };

@Injectable({
  providedIn: 'root'
})

export class AuthService {

  constructor(private http: HttpClient) { }

  private _googleSignInStatus: boolean;


  authIDTokenUrl = 'http://localhost:3000/api/enn/authIDToken'

  set googleSignInStatus(newStatus:boolean) {
  	this._googleSignInStatus = newStatus;
  }

  get googleSignInStatus():boolean {
  	return this._googleSignInStatus;
  }

  get signedIn() {
    return this._googleSignInStatus;
  }

  authenticateIDToken(idToken:string) {
	    let data = {token:idToken};
	    console.log("DATA TO POST: ", data);
	    return this.http.post(this.authIDTokenUrl, data, httpOptions)
	      .pipe(
	        catchError(this.handleError)
	          )
  }

	handleError(errMSG: HttpErrorResponse) {
		return throwError(
	    'Something bad happened; please try again later.');
	}	
}


