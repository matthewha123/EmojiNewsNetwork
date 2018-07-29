import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, of, Subject } from 'rxjs';
import { catchError, map, tap, retry } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class NewEmojiServiceService {

  constructor(private http: HttpClient) { }
  public searchString = new Subject<string>()

  getEmojis(): Observable<any> {
  	return this.http.get('assets/emojis.json');
  }
  

  setSearchString(str: string) {
  	this.searchString.next(str);
  }

  getSearchFilteredEmojis(emoji_dict:object, emoji_keys, searchString) {
  	let filteredEmojis = [];
  	for(let key of emoji_keys) {
  		let keywords = emoji_dict[key]['keywords'];
  		for(let word of keywords) {
  			if(word.includes(searchString)) {
  				filteredEmojis.push(key);
  			}
  		}
  	}

  	return filteredEmojis;
  }
}
