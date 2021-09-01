import { TestBed, inject } from '@angular/core/testing';

import { EditProfileComponent } from './EditProfile.component';

describe('a EditProfile component', () => {
	let component: EditProfileComponent;

	// register all needed dependencies
	beforeEach(() => {
		TestBed.configureTestingModule({
			providers: [
				EditProfileComponent
			]
		});
	});

	// instantiation through framework injection
	beforeEach(inject([EditProfileComponent], (EditProfileComponent) => {
		component = EditProfileComponent;
	}));

	it('should have an instance', () => {
		expect(component).toBeDefined();
	});
});