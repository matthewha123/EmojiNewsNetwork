import { Component, OnInit, Output, EventEmitter, ViewChild} from '@angular/core';
import { Observable, of, Subject } from 'rxjs';
import { debounceTime } from 'rxjs/operators';
import {NewEmojiServiceService } from '../new-emoji-service.service';

@Component({
  selector: 'app-category-nav',
  templateUrl: './category-nav.component.html',
  styleUrls: ['./category-nav.component.css']
})
export class CategoryNavComponent implements OnInit {

	selectedNav = 0;
	searchString: string = '';
  prevSearchString: string = '';

  inputChange = new Subject<string>();

  constructor(private ES: NewEmojiServiceService) {
    const inputSub = this.inputChange.pipe(
        debounceTime(500)
      ).subscribe(() => {
        this.search();
        console.log('subscribing!!');
      });
   }

  @Output() navClick = new EventEmitter<string>();
  ngOnInit() {

  }

  onNavClick(navID, navString, num:number) {
  	this.selectedNav = num;
  	this.navClick.emit(navString);
  }

  search() {
    this.ES.setSearchString(this.searchString);
  }

  ngAfterViewInit() {
    }

}
