import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { NewEmojiServiceService } from './new-emoji-service.service'
import { Observable, of } from 'rxjs';

@Component({
  selector: 'app-testing-emoji-keyboard',
  templateUrl: './testing-emoji-keyboard.component.html',
  styleUrls: ['./testing-emoji-keyboard.component.css']
})
export class TestingEmojiKeyboardComponent implements OnInit {
  @Input() model;
  @Output() modelChange = new EventEmitter<string>();
	output: string = '';

  skinTonePickerX: number = 0;
  skinTonePickerY: number = 0;
  skinTonePicker = false;


	popUp: boolean= false;
  constructor(private ES: NewEmojiServiceService) { }
  emoji_ordering: string[];
  emojis: object[];
  cat_dict: object;

  searchString = '';
  filteredEmojis = [];

  cat_ordering = ['people', 'animals_and_nature', 'food_and_drink','activity','travel_and_places', 'objects','symbols','flags'];
  cat_headers = 
              { 'people': 'People',
                'animals_and_nature': 'Animals and Nature',
                'food_and_drink': 'Food and Drink',
                'activity': 'Activity',
                'travel_and_places': 'Travel and Places',
                'objects': 'Objects',
                'symbols': 'Symbols',
                'flags': 'Flags'
              }
  ngOnInit() {
  	this.ES.getEmojis().subscribe((em) => {
  		 this.emoji_ordering = this.makeEmojiOrdering(em);
       // console.log("emoji ordering", this.emoji_ordering);
       this.emojis = em;
       this.cat_dict = this.makeCatDict(this.emojis, this.emoji_ordering);
       // console.log("cat dict", this.cat_dict);

  	})
    this.ES.searchString.subscribe((str) => {
      this.searchString = str;
      if(this.emojis && this.searchString.length != 0) this.filteredEmojis = this.getSearchFilteredEmojis(); 
    })


  }

  onInputFocus() {
  	this.popUp = true;
    this.ES.setCurrEmojiContextMenu(undefined);
  }

  makeEmojiOrdering(rawJSON: object) {
    return Object.keys(rawJSON);
  }

  makeCatDict(emojis, emoji_ordering) {
    let cat_dict = {}
    for(let name of emoji_ordering) {
      let category = emojis[name]['category'];
      if(category in cat_dict) {
        cat_dict[category].push(name);
      } else {
        cat_dict[category] = [];
        cat_dict[category].push(name);
      }
    }
    return cat_dict;
  }

  onEmojiSelected(emoji_char:string, textField:any) {
    this.model += emoji_char;
    console.log(textField.selectionStart);
    this.moveCursorToEnd(textField, this.model);
    this.modelChange.emit(this.model);
  }

  onInputBlur(textField:any) {
    // textField.selectionStart = textField.selectionEnd = textField.value.length + 2;
    // textField.focus();
    // this.moveCursorToEnd(textField, this.output);
  }
  moveCursorToEnd(el, newValue) {
    el.focus();
    if(el.setSelectionRange) {
      let len = el.value.length * 2;
      setTimeout(() => {
        el.setSelectionRange(len,len);
      }, 1);

    } else {
        el.value = newValue;
    }
    el.scrollTop = 999999;
}

onNavClick(navString) {
   let el = document.getElementById(navString);
   el.scrollIntoView();
}
  getSearchFilteredEmojis() {
    return this.ES.getSearchFilteredEmojis(this.emojis,this.emoji_ordering, this.searchString);
  }

  onEmojiPickerClose() {
    this.popUp = false;
        this.ES.setCurrEmojiContextMenu(undefined);

  }

    onEmojiRightClick(rcEvent) {
    console.log("RIGHT CLICK!!!");
    this.skinTonePickerX = rcEvent.clientX;
    this.skinTonePickerY = rcEvent.clientY;
    this.skinTonePicker = true;
   console.log("X VAL", this.skinTonePickerX);
   console.log("Y Val", this.skinTonePickerY);
  }

  disableSkinTonePicker() {
    this.skinTonePicker = false;
  }
}
