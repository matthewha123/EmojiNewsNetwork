import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-emoji',
  templateUrl: './emoji.component.html',
  styleUrls: ['./emoji.component.css']
})
export class EmojiComponent implements OnInit {

	//what should this object know...
	//emojis to display will be determined by a search I guess
	// So, really, what should this object know
	// Should know the input emoji
	// Should know hether its fitzpatrick or not
	// Should have the service to get the chosen skin color
	// 
	@Input() emoji_char: string;
	@Input() isFitz: boolean;

	@Output() emojiSelected = new EventEmitter<string>();

	//In CSS: should be highlightable

  constructor() { }

  ngOnInit() {
  }

  onLeftClick() {
  	console.log("Selected "+this.emoji_char);
  	this.emojiSelected.emit(this.emoji_char);
  }
}
