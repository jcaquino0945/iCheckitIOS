import { Component, OnInit, ViewChild, ElementRef } from "@angular/core";
import { AuthService } from "../services/Auth/auth.service";
import { firebase } from "@nativescript/firebase";
import { Router } from "@angular/router";

@Component({
  moduleId: module.id,
  selector: "Login",
  templateUrl: "./Login.component.html",
  styleUrls: ["./Login.component.css"]
})
export class LoginComponent implements OnInit {
  //userData;
  //WAG MUNA TANGGALIN MGA NAKA COMMENT

  @ViewChild("passwordField") passwordField: ElementRef;
  _email = "";
  _password = "";

  emailError = "";
  passwordError = "";

  constructor(private auth: AuthService, private router: Router) {}
  // this.signInError = "email cannot be empty";
  //   	/*
  // if (this._email == '') {
  // 	this.nameError = true;
  // }
  // */

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
  onToggle() {
    console.log(this.passwordField.nativeElement.secure);
    this.passwordField.nativeElement.secure = !this.passwordField.nativeElement
      .secure;
  }
  
  public tapLogin() {
    console.log(this._email, this._password);
    if (this._email.length == 0)
      this.emailError = "Email field is required and cannot be empty";
    if (this._password.length == 0)
      this.passwordError = "Password field is required and cannot be empty";
    if (this._email.length > 0) this.emailError = "";
    if (this._password.length > 0) this.passwordError = "";

    this.auth.login(this._email, this._password);
  }

  public tapforgotPass() {
    this.router.navigate(["/forgot-password"]);
  }
  public tapcreateAcc() {
    this.router.navigate(["/register"]);
  }

  
}
