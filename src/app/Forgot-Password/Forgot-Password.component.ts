import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router"

@Component({
	moduleId: module.id,
	selector: 'Forgot-Password',
	templateUrl: './Forgot-Password.component.html',
	styleUrls: ['./Forgot-Password.component.css']
})

export class ForgotPasswordComponent implements OnInit {

  _email = "";

	public constructor(private router: Router) { }

	ngOnInit() { }

  public tapSubmit() {
    console.log (this._email);
  }
  public tapBack(){
    this.router.navigate(["/login"])
  }
}
