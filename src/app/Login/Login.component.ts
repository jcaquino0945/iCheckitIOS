import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/Auth/auth.service';
import { firebase } from "@nativescript/firebase";

@Component({
	moduleId: module.id,
	selector: 'Login',
	templateUrl: './Login.component.html',
	styleUrls: ['./Login.component.css']
})

export class LoginComponent implements OnInit {
//userData;
//WAG MUNA TANGGALIN MGA NAKA COMMENT

_email = "";
_password = "";

	constructor(private auth:AuthService) { }

	ngOnInit() {
		/*
		firebase.getCurrentUser()
		.then(user => this.userData = user)
		.catch(error => console.log("Trouble in paradise: " + error)); */
	}
	/*
	register() {
		this.auth.createAccount('juancarlos.aquino.iics@ust.gmail.com','test12345','Miguel UST','123456');
	}

	login() {
		this.auth.test()
	}
	*/

  public tapLogin() {
    console.log (
      this._email,
      this._password
    );
	this.auth.login(this._email,this._password);
  }
}
