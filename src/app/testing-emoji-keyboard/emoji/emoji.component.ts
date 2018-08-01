import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { NewEmojiServiceService } from '../new-emoji-service.service'

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

	skinTonePickerX: number = 0;
	skinTonePickerY: number = 0;
	skinTonePicker = false;

	//In CSS: should be highlightable

  constructor(private ES: NewEmojiServiceService) { }

  ngOnInit() {
  	this.ES.currEmojiContextMenu.subscribe((currSelected) => {
  		this.skinTonePicker = (currSelected===this.emoji_char);
  	})
  }

  onLeftClick() {
  	console.log("Selected "+this.emoji_char);
  	this.emojiSelected.emit(this.emoji_char);
  	// console.log("🏿"+"👶", "👶"+"🏿");
  }

  onPickerLeftClick(emoji_char) {
  	this.emojiSelected.emit(emoji_char);
  }

  onRightClick(rcEvent) {
  	console.log("RIGHT CLICK!!!");
  	console.log(this.isFitz);
  	this.skinTonePickerX = rcEvent.layerX;
  	this.skinTonePickerY = rcEvent.offsetY;
  	this.skinTonePicker = true;
  	this.ES.setCurrEmojiContextMenu(this.emoji_char);
  }

  disableSkinTonePicker() {
  	this.skinTonePicker = false;
  }
}
