import { Component, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { FormControl, FormGroup } from '@angular/forms';
import { Validators, EmailValidator } from '@angular/forms';
import { LoginService } from '../login.service';
@Component({
  selector: 'app-login-modal',
  templateUrl: './login-modal.component.html',
  styleUrls: ['./login-modal.component.css']
})
export class LoginModalComponent implements OnInit {

  constructor(public activeModal: NgbActiveModal, private LS: LoginService) { }

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
  			console.log("Reigster http response", resp)
  		})
  }
}
