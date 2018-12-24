import { Component, ViewChild, OnInit } from '@angular/core';
import { HeadLine } from './headline';
import { Translation } from './translations/translation';
import { TranslationService } from './translations/translation.service';
import { TranslationsMasterComponent } from './translations/translations-master/translations-master.component';
import { HeadlineService } from './headline.service';
import {Router, ActivatedRoute} from '@angular/router';
import { LocalStorageService } from './local-storage.service';
import { LoginService } from './login/login.service';
import { User } from './login/user';
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


  constructor(private TS: TranslationService, private HS: HeadlineService, private router: Router, private route: ActivatedRoute, private LSS: LocalStorageService, private LS: LoginService ) {}
  ngOnInit() {

    if(this.LSS.get("jwt") != null) {
      this.LS.verify(this.LSS.get("jwt"))
        .subscribe((resp) => {
          console.log("Verify http response", resp);
          let respUser = resp['user']
          this.LS.setUser(new User(respUser["_id"], respUser["username"], respUser["email"]));
          this.LS.userLoggedIn.next();
        });
      } else {
        console.log("NO JWT TOKEN!");
      }

    this.HS.getHeadlines(true);
    this.HS.redirectToPageNotFound.subscribe(() => {
        this.router.navigate(["/woopsy"]);
    });
  }


}
