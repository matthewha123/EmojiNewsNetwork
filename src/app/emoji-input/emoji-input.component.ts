import { Component, OnInit, Input, Output, EventEmitter, } from '@angular/core';

@Component({
  selector: 'app-emoji-input',
  templateUrl: './emoji-input.component.html',
  styleUrls: ['./emoji-input.component.css']
})
export class EmojiInputComponent implements OnInit {
  text: string = '';
  openPopup: Function;

  @Output() SubmittedEmoji = new EventEmitter<string>();

  setPopupAction(fn: any) {
    console.log('setPopupAction');
    this.openPopup = fn;
  }

  submit() {
  	this.SubmittedEmoji.emit(this.text);

  }
  constructor() { }

  ngOnInit() {
  }

}
