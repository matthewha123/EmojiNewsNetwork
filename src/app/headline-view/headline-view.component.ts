import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { HeadLine } from '../headline'
import { HeadlineService } from '../headline.service';
import { HlMovementComponent } from '../hl-movement/hl-movement.component'

@Component({
  selector: 'app-headline-view',
  templateUrl: './headline-view.component.html',
  styleUrls: ['./headline-view.component.css']
})
export class HeadlineViewComponent implements OnInit {

  @Output() headlineChange = new EventEmitter<HeadLine>();

  headlines: HeadLine[];
  headlinesIDX: number;

  constructor(private headlineService: HeadlineService) { }

  ngOnInit() {
  	this.getHeadlines();

  }

  getHeadlines() {
  	this.headlineService.getHeadlines()
      .subscribe(headlines => {
        this.headlines = headlines;
        this.initializeHeadlines();
        console.log(this.headlines);
      });
  }
  forward() {
    this.headlinesIDX += 1;
     if (this.headlinesIDX >= this.headlines.length) {
        this.headlinesIDX = 0;
      }
      this.headlineChange.emit(this.headlines[this.headlinesIDX]);
  }
  backward() {
    this.headlinesIDX += -1;
     if (this.headlinesIDX < 0) {
        this.headlinesIDX = this.headlines.length - 1;
      }
      this.headlineChange.emit(this.headlines[this.headlinesIDX]);
  }

  initializeHeadlines() {
    this.headlinesIDX = 0;
    this.headlineChange.emit(this.headlines[this.headlinesIDX]);
    console.log(this.headlines[this.headlinesIDX]);
  }
}
