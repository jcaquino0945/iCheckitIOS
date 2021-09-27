import { Application } from '@nativescript/core';
import { RadSideDrawer } from 'nativescript-ui-sidedrawer';
import { Component, OnInit } from '@angular/core';

@Component({
	moduleId: module.id,
	selector: 'Verification-Task',
	templateUrl: './Verification-Task.component.html',
	styleUrls: ['./Verification-Task.component.css']
})

export class VerificationTaskComponent implements OnInit {

	constructor() { }

	ngOnInit() { }

	onDrawerButtonTap(): void {
		const sideDrawer = <RadSideDrawer>Application.getRootView();
		sideDrawer.showDrawer();
	  }
}