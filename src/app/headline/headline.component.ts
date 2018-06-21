import { Component, OnInit } from '@angular/core';
//Later make a service to get a headline, actually could do that now!

//This is impirtant functionality!

@Component({
  selector: 'app-headline',
  templateUrl: './headline.component.html',
  styleUrls: ['./headline.component.css']
})
export class HeadlineComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
