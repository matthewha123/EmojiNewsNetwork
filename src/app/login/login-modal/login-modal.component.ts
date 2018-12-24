import { Component, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { FormControl, FormGroup } from '@angular/forms';
import { Validators, EmailValidator } from '@angular/forms';
import { LoginService } from '../login.service';
import { LocalStorageService } from '../../local-storage.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-login-modal',
  templateUrl: './login-modal.component.html',
  styleUrls: ['./login-modal.component.css']
})
export class LoginModalComponent implements OnInit {

  constructor(public activeModal: NgbActiveModal, private LS: LoginService, private LSS: LocalStorageService, private router: Router) { }

  private mode: string = "Sign In";

  private createUserForm = new FormGroup({
    username: new FormControl('', Validators.required),
    email: new FormControl('', [Validators.required, Validators.pattern('^[^\\s@]+@[^\\s@]+\\.[^\\s@]{2,}$')]),
    password: new FormControl('', Validators.required)

  });

  ngOnInit() {

  }

  close() {
  	this.activeModal.close('Modal Closed');
  }

  goToCreateAccount() {
  	this.mode = "Create Account";
  }

  onClickCreate() {
  	console.log("Create User Button Clicked!");
  	this.LS.register(this.createUserForm.value)
  		.subscribe((resp) => {
  			console.log("Reigster http response", resp);
  			console.log("JWT TOKEN IS", resp["token"]);
  			this.LSS.set("jwt", resp["token"]);
  			// location.reload();
  			//set the username, email, id here

  			//Flow
  				// Create user - save a token, save the username, email, id locally
  				// Then, on every vote or translation submission, send the token, and the user info

  				//On expried token or logout - the following actions should be done atomically
  					// Delete the token, delete the user info
  					// ..or, only save the token and have the server do everything from there... yea?
  					// Only saving the token is pretty good
  					// have the servers decode the token first without verifying
  					// THen it will get the rest of the users information
  					// Okay thats pretty good.

  			//Then on reloading or entering the page the first time
  				// Check to see if "jwt" is set
  				//send it
  				//wait for a response, if valid, then the link with the user info should become activeModal
  				//otherwise, its inactive, and the user will have to sign in again

  				//what will this look like?
  					//link on nav bar -- for the decoded token username
  					//clicking on it will always send a request along with the jwt token

  					//if when clicking on it, or when first loading the page the request returns invalid jwt token
  						// then, if on the page, redirect back to the landing
  						// delete the jwt
  						// make signin again
  						// link is gone
  		})
  }
}
