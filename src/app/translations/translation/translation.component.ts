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
  	this.storageKey = 'vote'+'trans:'+this.translation['id'];
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
    let storageVal = this.LSS.get(this.storageKey);
    if(storageVal == 'up') this.Vote(-1, true);
    else if(storageVal == 'down') this.Vote(2);
    else this.Vote(1);
  }

  onDownvoteClick() {
    let storageVal = this.LSS.get(this.storageKey);
  	if(storageVal == 'up') this.Vote(-2);
    else if(storageVal == 'down') this.Vote(1, true);
    else this.Vote(-1);
  }


  Vote(modifier:number, noVote?:boolean) {
    console.log(modifier, " to ", this.translation);
    let data = {trans_id: this.translation.id, modifier: modifier, noVote:false};
    if(noVote != undefined) data['noVote'] = noVote;
    this.vote.emit(data);
  }

}
