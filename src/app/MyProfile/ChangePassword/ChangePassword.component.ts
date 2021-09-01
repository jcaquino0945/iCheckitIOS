import { Component, OnInit } from '@angular/core';
import { RadSideDrawer } from 'nativescript-ui-sidedrawer';
import { Application } from '@nativescript/core';
import { ModalDialogParams } from '@nativescript/angular';
@Component({
	selector: 'ChangePassword',
	templateUrl: './ChangePassword.component.html',
	styleUrls: ['./ChangePassword.component.css']
})

export class ChangePasswordComponent implements OnInit {

	constructor(private modalDialogParams: ModalDialogParams) { }

	ngOnInit() { }

	onDrawerButtonTap(): void {
		const sideDrawer = <RadSideDrawer>Application.getRootView()
		sideDrawer.showDrawer()
	}

	onUpdate(){
		alert("Password is changed")
		this.modalDialogParams.closeCallback()
	}
}