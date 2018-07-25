import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { Translation } from '../translation';
import { LocalStorageService } from '../../local-storage.service';

@Component({
  selector: 'app-translation',
  templateUrl: './translation.component.html',
  styleUrls: ['./translation.component.css']
})
export class TranslationComponent implements OnInit {

	@Input() translation: Translation;
	@Input() hl_id: number;

	@Output() vote = new EventEmitter<any>();

	upvote: boolean = false;
	downvote: boolean = false;

	uvColorHex = '#0fbc00';
	dvColorHex = '#a00000';
	defaultHex = '#aab2a9';

	storageKey: string;

	// UpVoteColor: string;
	// DownVoteColor: string;

  constructor(private LSS: LocalStorageService) { }

  ngOnInit() {
  	console.log("received following translation:: ", this.translation);
  	// this.UpVoteColor = this.LSS.get('vote')==='up' ? this.uvColorHex : this.defaultHex;
  	// this.DownVoteColor = this.LSS.get('vote')==='down' ? this.dvColorHex : this.defaultHex;
  	this.storageKey = 'vote'+'trans:'+this.translation['id']+'hl:'+this.hl_id;
  }

  get UpvoteColor() {
  	if (this.LSS.get(this.storageKey)==='up') return this.uvColorHex;
  	else return this.defaultHex;
  }

  get DownvoteColor() {
  	if (this.LSS.get(this.storageKey)==='down') return this.dvColorHex;
  	else return this.defaultHex;
  }

  onUpvoteClick() {
  	if(this.LSS.get(this.storageKey) != 'up') this.plusOne();
 	else this.minusOne(true);
  }

  onDownvoteClick() {
  	if(this.LSS.get(this.storageKey) != 'down') this.minusOne();
  	else this.plusOne(true);
  }

  plusOne(noVote?: boolean) {
  		console.log("+1 to ", this.translation);
  		let data = {trans_id: this.translation.id, modifier: 1, noVote: false};
  		if(noVote) data['noVote'] = true;
  		this.vote.emit(data);

  }

  minusOne(noVote?: boolean) {
  		console.log("-1 to ", this.translation);
  		let data = {trans_id: this.translation.id, modifier: -1, noVote: false};
  		if(noVote) data['noVote'] = true;
  		this.vote.emit(data);
  }

}
