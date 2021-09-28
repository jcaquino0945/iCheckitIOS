import { Application, View } from '@nativescript/core';
import { RadSideDrawer } from 'nativescript-ui-sidedrawer';
import { Component, OnInit, NgZone } from '@angular/core';
import { firebase, firestore } from "@nativescript/firebase";
import { RouterLink } from "@angular/router";
import { Router } from "@angular/router";
import { storage } from "@nativescript/firebase/storage";
import { FormBuilder } from '@angular/forms';
import { Validators } from '@angular/forms';

@Component({
	moduleId: module.id,
	selector: 'Verification-Task',
	templateUrl: './Verification-Task.component.html',
	styleUrls: ['./Verification-Task.component.css']
})

export class VerificationTaskComponent implements OnInit {
	submitForm!: any;
	verificationTask;
	dateToday = Date.now();
	myFile = '';
	private _hostView: View;
	constructor(private router: Router, private zone: NgZone, private fb: FormBuilder) { }

	ngOnInit() { 
		this.submitForm = this.fb.group({
			proposedSection: ['',Validators.required]
		});

		const verifyTask = firestore
		.collection("verificationTasks")
		.doc("60ThDEIPXLwWD8aHYs8E");
  
	  verifyTask.get({ source: "server" }).then(doc => {
		if (doc.exists) {
		  console.log(`Document data: ${JSON.stringify(doc.data())}`);
		  this.verificationTask = doc.data();
		} else {
		  console.log("No such document!");
		}
	  });
	}

	onDrawerButtonTap(): void {
		const sideDrawer = <RadSideDrawer>Application.getRootView();
		sideDrawer.showDrawer();
	  }

	submitTask() {
		if (this.submitForm.valid) {
			alert('valid')
		  }

		else if (this.submitForm.invalid) {
			this.submitForm.controls['proposedSection'].markAsTouched();
			alert('Please fill up all required fields properly');
		}
	}
}