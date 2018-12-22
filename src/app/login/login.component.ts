import { Component, OnInit } from '@angular/core';
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';
import { LoginService } from './login.service';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
	private mode: string = 'Sign In';

  constructor(private modalService: NgbModal, private LS: LoginService) { }

  ngOnInit() {
  }

  open(content, backToSignIn) {
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
    }, (reason) => {
      console.log("BACK TO SIGNING", backToSignIn);
      if(backToSignIn == true) {
        this.goToSignIn();
      }
    });
  }

  goToCreateNewAccount() {
  	this.mode = "Create New Account";
  	console.log(this.mode);
  }
  goToSignIn() {
    this.mode = "Sign In"
  }

  onClickCreate() {
    console.log("CREATE BUTTON CLICKED");
  }


}
