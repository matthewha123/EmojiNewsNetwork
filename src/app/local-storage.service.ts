import { Inject, Injectable } from '@angular/core';
import { LOCAL_STORAGE, StorageService } from 'angular-webstorage-service';

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {

  constructor(@Inject(LOCAL_STORAGE) private localStorage: StorageService) { }


  set(key:string, val:string) {
  	this.localStorage.set(key, val);
  	console.log("storing: ", val, "in ", key);
  }

  get(key:string) {
  	  	// console.log("getting from localstroage key: ", key);
  	return this.localStorage.get(key);
  }

  remove(key: string) {
  	return this.localStorage.remove(key);
  }
}
