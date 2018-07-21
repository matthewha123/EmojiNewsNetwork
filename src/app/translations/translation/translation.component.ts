import { Component, OnInit, Input } from '@angular/core';
import { TranslationService } from '../translation.service';
import { Translation } from '../translation';

@Component({
  selector: 'app-translation',
  templateUrl: './translation.component.html',
  styleUrls: ['./translation.component.css']
})
export class TranslationComponent implements OnInit {

	@Input() translation: Translation;
	upvote: boolean = false;
	downvote: boolean = false;

	uvColorHex = '#0fbc00';
	dvColorHex = '#a00000';
	defaultHex = '#aab2a9';
  constructor() { }

  ngOnInit() {
  	console.log("received following translation:: ", this.translation);
  }

  get UpvoteColor() {
  	if (this.upvote && !this.downvote) return this.uvColorHex;
  	else return this.defaultHex;
  }

  get DownvoteColor() {
  	if (this.downvote && !this.upvote) return this.dvColorHex;
  	else return this.defaultHex;
  }

  onUpvoteClick() {
  	this.upvote = !this.upvote;
  	if(this.upvote) console.log("+1 to ", this.translation);
  	else console.log("-1 to ", this.translation);
  	this.downvote = false;
  }

  onDownvoteClick() {
  	this.downvote = !this.downvote;
  	if(this.downvote) console.log("-1 to ", this.translation);
  	else console.log("+1 to ", this.translation);
  	this.upvote = false;
  }

}
