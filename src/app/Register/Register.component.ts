import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/Auth/auth.service';
import { firebase } from "@nativescript/firebase";


@Component({
	moduleId: module.id,
	selector: 'Register',
	templateUrl: './Register.component.html',
	styleUrls: ['./Register.component.css']
})

export class RegisterComponent implements OnInit {

  _fullname = "";
  _email = "";
  _contactNum = "";
  _password = "";


  public constructor(
    private auth:AuthService
  ) { }

	ngOnInit() {
   }

  public tapRegister() {
    console.log (
      this._fullname,
      this._email,
      this._contactNum,
      this._password);

      this.auth.createAccount(this._email,this._password,this._fullname,this._password);
  }
}
