import { Component, OnInit } from '@angular/core';
import { Dialogs } from '@nativescript/core';
import { Router } from '@angular/router';
import { EventData } from '@nativescript/core';
@Component({
	moduleId: module.id,
	selector: 'MyProfile',
	templateUrl: './MyProfile.component.html',
	styleUrls: ['./MyProfile.component.css']
})

export class MyProfileComponent implements OnInit {

	constructor(private router: Router) { }

	ngOnInit() { }

	onDel(args: EventData) {
		const confirmOptions = {
		  title: 'Delete',
		  message: 'Are you sure you to delete your account?',
		  okButtonText: 'Yes',
		  cancelButtonText: 'No',
		  cancelable: true,
		}
	
		Dialogs.confirm(confirmOptions).then(result => {
		  alert("Account has been deleted")
		})
	}
	onChange() {
		// this.router.navigate(["/change-password"])
		console.log("change pass")
	  }
	
	  onEdit() {
		// this.router.navigate(["/edit-profile"])
		console.log("edit profile")

	  }
}