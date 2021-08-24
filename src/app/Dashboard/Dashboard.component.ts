import { Component, OnInit } from '@angular/core';
import { RadSideDrawer } from 'nativescript-ui-sidedrawer'
import { Application } from '@nativescript/core'
@Component({
	moduleId: module.id,
	selector: 'Dashboard',
	templateUrl: './Dashboard.component.html',
	styleUrls: ['./Dashboard.component.css']
})

export class DashboardComponent implements OnInit {

	constructor() { }

	ngOnInit() { }

	onDrawerButtonTap(): void {
		const sideDrawer = <RadSideDrawer>Application.getRootView()
		sideDrawer.showDrawer()
	  }
}