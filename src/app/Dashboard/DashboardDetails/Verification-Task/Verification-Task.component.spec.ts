import { TestBed, inject } from '@angular/core/testing';

import { VerificationTaskComponent } from './Verification-Task.component';

describe('a Verification-Task component', () => {
	let component: VerificationTaskComponent;

	// register all needed dependencies
	beforeEach(() => {
		TestBed.configureTestingModule({
			providers: [
				VerificationTaskComponent
			]
		});
	});

	// instantiation through framework injection
	beforeEach(inject([VerificationTaskComponent], (VerificationTaskComponent) => {
		component = VerificationTaskComponent;
	}));

	it('should have an instance', () => {
		expect(component).toBeDefined();
	});
});