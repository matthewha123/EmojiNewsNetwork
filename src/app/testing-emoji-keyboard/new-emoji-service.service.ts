import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, map, tap, retry } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class NewEmojiServiceService {

  constructor(private http: HttpClient) { }


  getEmojis(): Observable<any> {
  	return this.http.get('assets/emojis.json');
  }
}
