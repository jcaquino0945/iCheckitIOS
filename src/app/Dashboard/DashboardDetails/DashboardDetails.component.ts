import { Application } from '@nativescript/core';
import { RadSideDrawer } from 'nativescript-ui-sidedrawer';
import { Component, OnInit } from '@angular/core';

@Component({
	selector: 'DashboardDetails',
	templateUrl: './DashboardDetails.component.html',
	styleUrls: ['./DashboardDetails.component.css']
})

export class DashboardDetailsComponent implements OnInit {

	constructor() { }

	ngOnInit() { }

	onDrawerButtonTap(): void {
		const sideDrawer = <RadSideDrawer> Application.getRootView()
		sideDrawer.showDrawer()
	}

	submitTask() {
		alert("Submit attachment of task")
	}
}