import { Component, OnInit } from '@angular/core';
import { LoginService } from '../login/login.service';
import { User } from '../login/user';
@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  constructor(private LS: LoginService) { }

  private user: User;

  ngOnInit() {
  	this.LS.userLoggedIn.subscribe(() => {
  		this.user = this.LS.getUser();
  	})
  }

}
