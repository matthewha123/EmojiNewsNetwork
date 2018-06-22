import { Component, OnInit } from '@angular/core';
import { HeadLine } from '../headline';
import { HEADLINES } from '../mock-headlines';

@Component({
  selector: 'app-hl-info',
  templateUrl: './hl-info.component.html',
  styleUrls: ['./hl-info.component.css']
})
export class HlInfoComponent implements OnInit {

	display: HeadLine;
	idx: number;
  constructor() { }

  ngOnInit() {
  	this.idx = 0;
  	this.display = HEADLINES[this.idx];
  }

  forward() {
  	console.log("moving forward");
  	this.idx += 1;
  	if (this.idx >= HEADLINES.length) {
  		this.idx = 0;
  	}
  	this.display = HEADLINES[this.idx];
  }
  backward() {
  	this.idx += -1;
  	if (this.idx < 0) {
  		this.idx = HEADLINES.length - 1;
  	}
  	this.display = HEADLINES[this.idx];
  	console.log("moving backward");
  }



}
