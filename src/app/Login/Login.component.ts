import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/Auth/auth.service';
import { firebase } from "@nativescript/firebase";
import { Router } from "@angular/router"

@Component({
	moduleId: module.id,
	selector: 'Login',
	templateUrl: './Login.component.html',
	styleUrls: ['./Login.component.css']
})

export class LoginComponent implements OnInit {
//userData;
//WAG MUNA TANGGALIN MGA NAKA COMMENT
userData;
_email = "";
_password = "";
//nameError:Boolean;
	constructor(private auth:AuthService, private router: Router) { }

	ngOnInit() {
		//this.nameError = false;
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
	/*
	if (this._email == '') {
		this.nameError = true;
	}
	*/
	this.auth.login(this._email,this._password);
  }
  public tapforgotPass() {
    this.router.navigate(["/forgot-password"]);
  }
  public tapcreateAcc() {
    this.router.navigate(["/register"]);
  }
}
