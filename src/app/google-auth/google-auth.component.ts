import { Component, OnInit } from '@angular/core';
declare const gapi: any;

@Component({
  selector: 'app-google-auth',
  templateUrl: './google-auth.component.html',
  styleUrls: ['./google-auth.component.css']
})
export class GoogleAuthComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }


	  public auth2: any;
	  public googleInit() {
	    gapi.load('auth2', () => {
	      this.auth2 = gapi.auth2.init({
	        client_id: '890276463877-a739gmqetq14ct2gfb8ifp0g5hsbtql4.apps.googleusercontent.com',
	        cookiepolicy: 'single_host_origin',
	        scope: 'profile email'
	      });
	      this.attachSignin(document.getElementById('googleBtn'));
	      this.attachSignout(document.getElementById('googleBtnSignOut'));
	    });
	  }
	  public attachSignin(element) {
	    this.auth2.attachClickHandler(element, {},
	      (googleUser) => {

	        let profile = googleUser.getBasicProfile();
	        console.log('Token || ' + googleUser.getAuthResponse().id_token);
	        console.log('ID: ' + profile.getId());
	        console.log('Name: ' + profile.getName());
	        console.log('Image URL: ' + profile.getImageUrl());
	        console.log('Email: ' + profile.getEmail());
	        //YOUR CODE HERE


	      }, (error) => {
	        alert(JSON.stringify(error, undefined, 2));
	      });
	  }

	  public attachSignout(element) {
	  	this.auth2.attachClickHandler(element, {},
	  		(googleUser)=> {
	  			this.auth2.signOut().then(() => console.log("signed out!"));
	  		})
	  }

	ngAfterViewInit(){
	      this.googleInit();
	}
}
