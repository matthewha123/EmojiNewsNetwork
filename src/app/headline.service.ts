import { Injectable } from '@angular/core';
import { HeadLine } from './headline';
import { Observable, of, throwError } from 'rxjs';
import { news_key } from './api-keys';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { catchError, map, tap, retry } from 'rxjs/operators';
import { HEADLINES } from './mock-headlines'

@Injectable({
  providedIn: 'root'
})
export class HeadlineService {
  private headlinesURL = 'http://localhost:3000/api/enn/headlines'
  constructor(private http: HttpClient) { }

  getHeadlines(): Observable<HeadLine[]>{
    /*
    KEEP THIS CODE!
    THIS IS FOR actual NETWORKING
    */
  	// let res = this.http.get(this.news_url)
  	// 	.subscribe(res => {
  	// 		return res['articles'].map(article => {
  	// 			this.parseHeadline(article);
  	// 		});
  	// 	});
    return this.http.get<HeadLine[]>(this.headlinesURL)
    .pipe(
          retry(3),
         catchError(this.handleError)).pipe(
      map((res) => {
          if(res['status'] == 'success') {
            return res['data'];
          }
      }));
  }

  private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      console.error('An error occured:', error.error.message);
    } else {
      console.error(
        `Node server returned coed ${error.status},` +
        `body was ${error.error}`);
    }

    return throwError('something fucked up');
  }

  getUnparsedHeadlines() {
  }


  parseHeadline(article: any):HeadLine {
  	let hl = new HeadLine;
  	hl.publisher = article["source"]["name"];
  	hl.txt = article['title'];
  	hl.url = article['url'];
  	return hl;
  }
}
