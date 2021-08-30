import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router"

@Component({
	moduleId: module.id,
	selector: 'confirm-new-password',
	templateUrl: './confirm-new-password.component.html',
	styleUrls: ['./confirm-new-password.component.css']
})

export class ConfirmNewPasswordComponent implements OnInit {

  _newPassword = "";
  _confirmNewPassword = "";

	public constructor(private router: Router){

   }

	ngOnInit() { }

  public tapChangepass() {
    console.log (
      this._newPassword,
      this._confirmNewPassword
    );
  }
  public tapBack() {
    this.router.navigate(["/forgot-password"])
  }
}
