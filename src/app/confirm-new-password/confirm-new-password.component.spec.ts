import { TestBed, inject } from '@angular/core/testing';

import { ConfirmNewPasswordComponent } from './confirm-new-password.component';

describe('a confirm-new-password component', () => {
	let component: ConfirmNewPasswordComponent;

	// register all needed dependencies
	beforeEach(() => {
		TestBed.configureTestingModule({
			providers: [
				ConfirmNewPasswordComponent
			]
		});
	});

	// instantiation through framework injection
	beforeEach(inject([ConfirmNewPasswordComponent], (ConfirmNewPasswordComponent) => {
		component = ConfirmNewPasswordComponent;
	}));

	it('should have an instance', () => {
		expect(component).toBeDefined();
	});
});