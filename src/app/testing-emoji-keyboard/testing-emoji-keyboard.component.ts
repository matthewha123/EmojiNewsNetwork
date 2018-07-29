import { Component, OnInit } from '@angular/core';
import { NewEmojiServiceService } from './new-emoji-service.service'
@Component({
  selector: 'app-testing-emoji-keyboard',
  templateUrl: './testing-emoji-keyboard.component.html',
  styleUrls: ['./testing-emoji-keyboard.component.css']
})
export class TestingEmojiKeyboardComponent implements OnInit {
	output: string;

	popUp: boolean= false;
  constructor(private ES: NewEmojiServiceService) { }

  ngOnInit() {
  	this.ES.getEmojis().subscribe((em) => {
  		console.log(em['grinning']);
  	})
  }

  onInputFocus() {
  	console.log("yoyooyyo")
  	this.popUp = true;
  }



}
