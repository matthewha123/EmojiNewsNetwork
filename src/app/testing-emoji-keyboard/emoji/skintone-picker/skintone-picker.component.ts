import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { TONE_MODIFIERS } from './tone-modifiers';
@Component({
  selector: 'app-skintone-picker',
  templateUrl: './skintone-picker.component.html',
  styleUrls: ['./skintone-picker.component.css']
})
export class SkintonePickerComponent implements OnInit {
	@Input() emoji_char;
	@Output() emojiSelected = new EventEmitter<string>();

	TONE_MODIFIERS = TONE_MODIFIERS;
  constructor() { }

  ngOnInit() {
  	console.log(TONE_MODIFIERS);
  }

  onLeftClick(emoji_char) {
  	this.emojiSelected.emit(emoji_char);
  }

}
