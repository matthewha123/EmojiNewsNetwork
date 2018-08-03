import { Component, ViewChild, OnInit } from '@angular/core';
import { HeadLine } from './headline';
import { Translation } from './translations/translation';
import { TranslationService } from './translations/translation.service';
import { TranslationsMasterComponent } from './translations/translations-master/translations-master.component';
import { HeadlineService } from './headline.service';
import {Router, ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'Emoji News Network';
  activeHeadLine: HeadLine;
  hl_received = false;
  headlines: HeadLine[];
  headlineIDS = new Set();

  @ViewChild(TranslationsMasterComponent) tMaster;


  constructor(private TS: TranslationService, private HS: HeadlineService, private router: Router, private route: ActivatedRoute ) {}
  ngOnInit() {
    this.HS.InternalGetHeadlines(true);
    this.HS.redirectToPageNotFound.subscribe(() => {
        this.router.navigate(["/woopsy"]);
    })
  }


}
