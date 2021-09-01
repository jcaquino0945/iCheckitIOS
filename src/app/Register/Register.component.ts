import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/Auth/auth.service';
import { firebase } from "@nativescript/firebase";
import { Router } from "@angular/router"

@Component({
	moduleId: module.id,
	selector: 'Register',
	templateUrl: './Register.component.html',
	styleUrls: ['./Register.component.css']
})

export class RegisterComponent implements OnInit {

  fullnameError = "";
  emailError = "";
  contactnumError = "";
  passwordError = "";
  confirmPasswordError = "";




  _fullname = "";
  _email = "";
  _contactNum = "";
  _password = "";
  _confirmPassword = "";

  public constructor(
    private auth:AuthService, private router: Router
  ) { }

	ngOnInit() {
   }

  public tapRegister() {
    console.log (
      this._fullname,
      this._email,
      this._contactNum,
      this._password,
      this._confirmPassword
      );

      if (this._fullname.length == 0)
      this.fullnameError = "Full Name is required"
      if (this._email.length == 0)
      this.emailError = "Email is required"
      if (this._contactNum.length == 0)
      this.contactnumError = "Contact Number is required"
      if (this._password.length == 0)
      this.passwordError = "Password is required"
      if (this._confirmPassword.length == 0)
      this.confirmPasswordError = "Password is required"

      if (this._fullname.length > 0)
      this.fullnameError = ""
      if (this._email.length > 0)
      this.emailError = ""
      if (this._contactNum.length > 0)
      this.contactnumError = ""
      if (this._password.length > 0)
      this.passwordError = ""
      if (this._confirmPassword.length > 0)
      this.confirmPasswordError = ""




      this.auth.createAccount(this._email,this._password,this._fullname,this._password);
  }
  public tapBack() {
    this.router.navigate(['/login']);
  }
}
