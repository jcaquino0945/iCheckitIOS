import { Component, OnInit } from '@angular/core';

@Component({
	moduleId: module.id,
	selector: 'Forgot-Password',
	templateUrl: './Forgot-Password.component.html',
	styleUrls: ['./Forgot-Password.component.css']
})

export class ForgotPasswordComponent implements OnInit {

  _email = "";

	constructor() { }

	ngOnInit() { }

  public tapSubmit() {
    console.log (this._email);
  }
}
