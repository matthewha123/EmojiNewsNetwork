import { Component } from '@angular/core';
import { HeadLine } from './headline';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Emoji News Network';
  activeHeadLine: HeadLine;

  onEmojiSubmit(e) {
    console.log(e);
  }

  onHeadLineChange(newHeadLine: HeadLine) {
    this.activeHeadLine=newHeadLine;
    console.log(newHeadLine);
  }
}
