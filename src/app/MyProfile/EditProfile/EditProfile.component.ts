import { Application } from '@nativescript/core';
import { RadSideDrawer } from 'nativescript-ui-sidedrawer';
import { Component, OnInit } from '@angular/core';
import { ModalDialogParams } from '@nativescript/angular';
@Component({
	selector: 'EditProfile',
	templateUrl: './EditProfile.component.html',
	styleUrls: ['./EditProfile.component.css']
})

export class EditProfileComponent implements OnInit {

	constructor(private modalDialogParams: ModalDialogParams ) { }

	ngOnInit() { }

	onDrawerButtonTap(): void {
		const sideDrawer = <RadSideDrawer>Application.getRootView()
		sideDrawer.showDrawer()
	}

	onUpdate(){
		alert("Account is updated")
		this.modalDialogParams.closeCallback();
	}
}