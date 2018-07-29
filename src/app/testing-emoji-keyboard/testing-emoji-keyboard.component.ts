import { Component, OnInit } from '@angular/core';
import { NewEmojiServiceService } from './new-emoji-service.service'
@Component({
  selector: 'app-testing-emoji-keyboard',
  templateUrl: './testing-emoji-keyboard.component.html',
  styleUrls: ['./testing-emoji-keyboard.component.css']
})
export class TestingEmojiKeyboardComponent implements OnInit {
	output: string = '';

	popUp: boolean= false;
  constructor(private ES: NewEmojiServiceService) { }
  emoji_ordering: string[];
  emojis: object[];
  cat_dict: object;
  searchString: string = '';

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
  }

  onInputFocus() {
  	this.popUp = true;
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
    this.output += emoji_char;
    console.log(textField.selectionStart);
    this.moveCursorToEnd(textField, this.output);
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

onSearch(str: string) {
  this.searchString = str;
}
}
