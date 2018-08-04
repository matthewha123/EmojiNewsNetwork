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
	@Input() emojiObj: any;
  @Input() emojiName: string;

	@Output() emojiSelected = new EventEmitter<string>();


  get emojiChar() {return this.emojiObj['char']};
  get isFitz() {return this.emojiObj['fitzpatrick_scale']};

	skinTonePickerX: number = 0;
	skinTonePickerY: number = 0;
	skinTonePicker = false;

	//In CSS: should be highlightable

  constructor(private ES: NewEmojiServiceService) { }

  ngOnInit() {
  	this.ES.currEmojiContextMenu.subscribe((currSelected) => {
  		this.skinTonePicker = (currSelected===this.emojiChar);
  	})
  }

  onLeftClick() {
  	console.log("Selected "+this.emojiChar);
  	this.emojiSelected.emit(this.emojiChar);
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
  	this.ES.setCurrEmojiContextMenu(this.emojiChar);
  }

  disableSkinTonePicker() {
  	this.skinTonePicker = false;
  }

  onMouseOver() {
    this.emojiObj['name'] = this.emojiName;
    this.ES.displayEmojiDetails(this.emojiObj);
  }
}
