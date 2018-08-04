import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { HeadLine } from '../headline'
import { HeadlineService } from '../headline.service';
import { HlMovementComponent } from '../hl-movement/hl-movement.component'

@Component({
  selector: 'app-headline-view',
  templateUrl: './headline-view.component.html',
  styleUrls: ['./headline-view.component.css']
})
export class HeadlineViewComponent implements OnInit {
 @Input()  headline: HeadLine;
 @Input() backID: number;
 @Input() forwardID: number;

  constructor(private headlineService: HeadlineService) { }

  ngOnInit() {

  } 
  forward() {

  }
  backward() {

  }

  ngOnChanges() {
    this.headlineService.addToHeadlinesSeen(this.headline['id']);
  }

}
