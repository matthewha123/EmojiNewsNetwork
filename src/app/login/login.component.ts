import { Component, OnInit } from '@angular/core';
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';
import { LoginService } from './login.service';
import { FormControl, FormGroup } from '@angular/forms';
import { LoginModalComponent } from './login-modal/login-modal.component'
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private modalService: NgbModal, private LS: LoginService) { }

  ngOnInit() {
  }

  openLoginModal() {
    const modalRef = this.modalService.open(LoginModalComponent);

    modalRef.result.then((result) => {
      console.log(result);
    })
  }


}
