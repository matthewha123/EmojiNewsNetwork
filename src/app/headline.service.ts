import { Injectable } from '@angular/core';
import { HeadLine } from './headline';
import { Observable, of, throwError, Subject } from 'rxjs';
import { news_key } from './api-keys';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { catchError, map, tap, retry } from 'rxjs/operators';
import { HEADLINES } from './mock-headlines'

@Injectable({
  providedIn: 'root'
})
export class HeadlineService {
  private headlinesURL = 'http://localhost:3000/api/enn/headlines'

  headlineOrdering: number[] = [];
  headlineIDMapping: object = {};

  headlinesSeen = new Set();

  public redirectToPageNotFound = new Subject<any>();

  public landingID = new Subject<number>();

  constructor(private http: HttpClient) { }

  private getHeadlines(lowestID: number): Observable<HeadLine[]>{

    return this.http.get<HeadLine[]>(this.headlinesURL+'/many'+'/'+lowestID)
    .pipe(
          retry(3),
         catchError(this.handleError)).pipe(
      map((res) => {
          if(res['status'] == 'success') {
            return res['data'];
          }
      }));
  }

  private getMissingHeadline(id:number): Observable<HeadLine>{

    return this.http.get<HeadLine>(this.headlinesURL+'/'+id)
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
    if(error.status == 404) {
      console.log(this.redirectToPageNotFound);
    }
    if (error.error instanceof ErrorEvent) {
      console.error('An error occured:', error.error.message);
    } else {
      console.error(
        `Node server returned coed ${error.status},` +
        `body was ${error.error}`);
    }

    return 'error';
  }


  InternalGetHeadlines(navigateFromHome?: boolean, lowestID?: number) {

    let getHeadlinesIDArg = (lowestID === undefined) ? -1 : lowestID;
    this.getHeadlines(getHeadlinesIDArg).subscribe( (headlines) => {
          let emitID = false;
          if(this.headlineOrdering.length === 0) emitID = true;
         for(let hl of headlines) {
            this.headlineOrdering.push(hl['id']);
            this.headlineIDMapping[hl['id'].toString()] = hl;
        }
        if(emitID && navigateFromHome) {
          this.landingID.next(this.headlineOrdering[0]);
        }
    });
  }

  InternalGetHeadline(id: number) {
    return this.headlineIDMapping[id];
  }

  InternalGetMissingHeadline(id:number) {
    this.getMissingHeadline(id).subscribe( (hl) => {

      if(hl === undefined) {
        this.redirectToPageNotFound.next();
      } else {
      this.headlineOrdering.push(hl['id']);
      this.headlineIDMapping[hl['id'].toString()] = hl;
      }

    })
  }

  IsHeadlineLoaded(id:number) {
    if(!id) return false;
    return this.headlineIDMapping.hasOwnProperty(id.toString());
  }

  getAdjacentIDs(id:number) {
     let currIDX = this.headlineOrdering.indexOf(id);
    return {back: this.headlineOrdering[this.mod(currIDX-1, this.headlineOrdering.length)],
            forward: this.headlineOrdering[this.mod(currIDX+1, this.headlineOrdering.length)]}
  }

  private mod(n:number, m:number) {
    return ((n % m) + m) % m;
  }

  addToHeadlinesSeen(id: number) {
    this.headlinesSeen.add(id);
    console.log(this.headlinesSeen);
    if(this.headlinesSeen.size >= (this.headlineOrdering.length-2)) {
      console.log("should be getting new headlines rn");
      this.InternalGetHeadlines(false,Math.min(...this.headlineOrdering));
    }
  }
}
