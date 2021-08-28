import { Component, OnInit } from '@angular/core';


@Component({
	moduleId: module.id,
	selector: 'confirm-new-password',
	templateUrl: './confirm-new-password.component.html',
	styleUrls: ['./confirm-new-password.component.css']
})

export class ConfirmNewPasswordComponent implements OnInit {

  _newPassword = "";
  _confirmNewPassword = "";
	constructor() { }

	ngOnInit() { }

  public tapChangepass() {
    console.log (
      this._newPassword,
      this._confirmNewPassword
    );
  }
}
