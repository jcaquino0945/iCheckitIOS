import { TestBed, inject } from '@angular/core/testing';

import { RegisterComponent } from './Register.component';

describe('a Register component', () => {
	let component: RegisterComponent;

	// register all needed dependencies
	beforeEach(() => {
		TestBed.configureTestingModule({
			providers: [
				RegisterComponent
			]
		});
	});

	// instantiation through framework injection
	beforeEach(inject([RegisterComponent], (RegisterComponent) => {
		component = RegisterComponent;
	}));

	it('should have an instance', () => {
		expect(component).toBeDefined();
	});
});
