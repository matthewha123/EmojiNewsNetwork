import { Component, OnInit } from '@angular/core';
import { HeadlineService } from '../headline.service';
import { HEADLINES } from '../mock-headlines';
import { HlMovementComponent } from '../hl-movement/hl-movement.component'

@Component({
  selector: 'app-headline-view',
  templateUrl: './headline-view.component.html',
  styleUrls: ['./headline-view.component.css']
})
export class HeadlineViewComponent implements OnInit {

  constructor(private headlineService: HeadlineService) { }

  ngOnInit() {
  	this.getHeadlines();
  }

  getHeadlines() {
  	var headlines = this.headlineService.getHeadlines();
  	console.log(headlines);
  }

}
