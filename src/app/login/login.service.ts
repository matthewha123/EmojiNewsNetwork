import { Injectable } from '@angular/core';
import { Observable, of, throwError, Subject } from 'rxjs';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { catchError, map, tap, retry } from 'rxjs/operators';
import { User } from './user'

const httpOptions = {
    headers: new HttpHeaders( {
        'Content-Type':  'application/json'
      })
  };
@Injectable({
  providedIn: 'root'
})
export class LoginService {
	private baseURL: string = "http://localhost:3000/api/enn/"

  constructor(private http: HttpClient) { }

  //have a subject here/obervable that will fire when a successful login occurs, or have the component do so
  //if this fires, then what will happen
  	//will set the user credentials, here in memory, because the user credentials now exist
  	//The page will have 

  private user: User;
  public userLoggedIn = new Subject<any>();

  register(registrationData) {
  	console.log(registrationData)
  	return this.http.post(this.baseURL+"register", registrationData, httpOptions)
      .pipe(
        catchError(this.handleError)
          );
  }

  getUser():User {
  	return this.user;
  }

  setUser(_user: User) {
  	this.user = _user;
  	console.log("User is now!", this.user);
  }

  //function here to ask for verification of jwt token

  // called on startup, where from...

  verify(token) {
  	return this.http.post(this.baseURL+"verify", {"token": token}, httpOptions)
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
