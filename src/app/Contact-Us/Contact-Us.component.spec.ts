import { TestBed, inject } from '@angular/core/testing';

import { ContactUsComponent } from './Contact-Us.component';

describe('a Contact-Us component', () => {
	let component: ContactUsComponent;

	// register all needed dependencies
	beforeEach(() => {
		TestBed.configureTestingModule({
			providers: [
				ContactUsComponent
			]
		});
	});

	// instantiation through framework injection
	beforeEach(inject([ContactUsComponent], (ContactUsComponent) => {
		component = ContactUsComponent;
	}));

	it('should have an instance', () => {
		expect(component).toBeDefined();
	});
});