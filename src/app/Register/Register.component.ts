import { Component, OnInit } from '@angular/core';



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


  public constructor() { }

  public tapRegister() {
    console.log (
      this._fullname,
      this._email,
      this._contactNum,
      this._password

      );



  }
	ngOnInit() { }
}
