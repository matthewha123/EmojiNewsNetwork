import { Component, OnInit } from '@angular/core';
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';
import { LoginService } from './login.service';
import { FormControl, FormGroup } from '@angular/forms';
import { LoginModalComponent } from './login-modal/login-modal.component';
import { LocalStorageService } from '../local-storage.service';
import { User } from './user';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private modalService: NgbModal, private LS: LoginService, private LSS: LocalStorageService) { }

  private signedIn: boolean = false;

  ngOnInit() {

    this.LS.userLoggedIn.subscribe(() => {
      this.signedIn = true;
    });
  }

  openLoginModal() {
    const modalRef = this.modalService.open(LoginModalComponent);

    modalRef.result.then((result) => {
      console.log(result);
    })
  }

  signOut() {
    this.LSS.remove("jwt");
    location.reload();
  }


}
