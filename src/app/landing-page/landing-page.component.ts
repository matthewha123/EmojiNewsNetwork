import { Component, OnInit } from '@angular/core';
import { HeadlineService } from '../headline.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-landing-page',
  templateUrl: './landing-page.component.html',
  styleUrls: ['./landing-page.component.css']
})
export class LandingPageComponent implements OnInit {

  constructor(private HS: HeadlineService, private router: Router) { }

  ngOnInit() {
  	this.HS.landingID.subscribe(id => {
        this.router.navigate(["/headline", id]);
      })
  }

}
