import { Injectable } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';
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
export class LoginService {
	mode: string = 'Sign In';
	private baseURL: string = "http://localhost:3000/api/enn/register"

  constructor(private http: HttpClient) { }


  register(registrationData) {
  	console.log(registrationData)
  	return this.http.post(this.baseURL, registrationData, httpOptions)
      .pipe(
        catchError(this.handleError)
          );
  }


  private handleError(error: HttpErrorResponse) {
    console.log("Handling error:", error)
    if(error.status == 404) {
      console.log('404');
    }
    if (error.error instanceof ErrorEvent) {
      console.error('An error occured:', error.error.message);
    } else {
      console.error(
        "Could Not Connect To Remote Server");
    }

    return 'error';
  }
}
