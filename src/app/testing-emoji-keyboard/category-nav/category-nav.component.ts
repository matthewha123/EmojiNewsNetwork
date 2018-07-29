import { Component, OnInit, Output, EventEmitter} from '@angular/core';

@Component({
  selector: 'app-category-nav',
  templateUrl: './category-nav.component.html',
  styleUrls: ['./category-nav.component.css']
})
export class CategoryNavComponent implements OnInit {

	selectedNav = 0;
	searchString: string = '';
  constructor() { }

  @Output() navClick = new EventEmitter<string>();
  @Output() search = new EventEmitter<string>();
  ngOnInit() {
  }

  onNavClick(navID, navString, num:number) {
  	this.selectedNav = num;
  	this.navClick.emit(navString);
  }

  onSearch() {
  	this.search.emit(this.searchString);
  }
}
