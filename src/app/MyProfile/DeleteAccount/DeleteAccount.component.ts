import { Component, OnInit } from '@angular/core';
import { ModalDialogParams } from '@nativescript/angular';
@Component({
	selector: 'DeleteAccount',
	templateUrl: './DeleteAccount.component.html',
	styleUrls: ['./DeleteAccount.component.css']
})

export class DeleteAccountComponent implements OnInit {

	constructor(private modalDialogParams: ModalDialogParams) { }

	ngOnInit() { }

	onUpdate() {
		alert("The account has been deleted")
		this.modalDialogParams.closeCallback();
	}

	goBack(){
		this.modalDialogParams.closeCallback();
	}
}