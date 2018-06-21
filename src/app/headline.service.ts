import { Injectable } from '@angular/core';
import { HeadLine } from './headline';
import { Observable, of} from 'rxjs';
import { news_key } from './api-keys';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, map, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class HeadlineService {
	private news_url = 'https://newsapi.org/v2/top-headlines?'+
						'pageSize=50&'+
						'country=us&' +
     					'apiKey='+news_key;
  constructor(private http: HttpClient) { }

  getHeadlines() {
  	let res = this.http.get(this.news_url)
  		.subscribe(res => {
  			return res['articles'].map(article => {
  				this.parseHeadline(article);
  			});
  			console.log(res.keys()
  		});
  }

  getUnparsedHeadlines() {
  }


  parseHeadline(article: any):HeadLine {
  	let hl = new HeadLine;
  	hl.publisher = article["source"]["name"];
  	hl.text = article['title'];
  	hl.url = article['url'];
  	return hl;
  }
}
