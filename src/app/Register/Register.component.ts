import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/Auth/auth.service';
import { firebase } from "@nativescript/firebase";
import { Router } from "@angular/router"
import { FormBuilder } from '@angular/forms';
import { Validators } from '@angular/forms';

@Component({
	moduleId: module.id,
	selector: 'Register',
	templateUrl: './Register.component.html',
	styleUrls: ['./Register.component.css']
})

export class RegisterComponent implements OnInit {
  loginForm!: any;

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
    private auth:AuthService, private router: Router, private fb: FormBuilder
  ) { }

  // Validators.pattern('^[a-z0-9._%+-]+@[(ust.edu)]+\\.ph$')
	ngOnInit() {
    this.loginForm = this.fb.group({
      _email: ['',[Validators.required,Validators.email,]],
      _fullName: ['',Validators.required],
      _password: ['',Validators.required],
      _confirmPassword: ['',  Validators.required],
      _contactNumber: ['',Validators.required]
    });
   }

  public tapRegister() {
    console.log (
      this._fullname,
      this._email,
      this._contactNum,
      this._password,
      this._confirmPassword
      );






      this.auth.createAccount(this._email,this._password,this._fullname, this._contactNum);
  }
  public tapBack() {
    this.router.navigate(['/login']);
  }
}
