import { TestBed, inject } from '@angular/core/testing';

import { DeleteAccountComponent } from './DeleteAccount.component';

describe('a DeleteAccount component', () => {
	let component: DeleteAccountComponent;

	// register all needed dependencies
	beforeEach(() => {
		TestBed.configureTestingModule({
			providers: [
				DeleteAccountComponent
			]
		});
	});

	// instantiation through framework injection
	beforeEach(inject([DeleteAccountComponent], (DeleteAccountComponent) => {
		component = DeleteAccountComponent;
	}));

	it('should have an instance', () => {
		expect(component).toBeDefined();
	});
});