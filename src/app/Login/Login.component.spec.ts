import { TestBed, inject } from '@angular/core/testing';

import { LoginComponent } from './Login.component';

describe('a Login component', () => {
	let component: LoginComponent;

	// register all needed dependencies
	beforeEach(() => {
		TestBed.configureTestingModule({
			providers: [
				LoginComponent
			]
		});
	});

	// instantiation through framework injection
	beforeEach(inject([LoginComponent], (LoginComponent) => {
		component = LoginComponent;
	}));

	it('should have an instance', () => {
		expect(component).toBeDefined();
	});
});