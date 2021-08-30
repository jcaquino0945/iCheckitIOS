import { TestBed, inject } from '@angular/core/testing';

import { DashboardDetailsComponent } from './DashboardDetails.component';

describe('a DashboardDetails component', () => {
	let component: DashboardDetailsComponent;

	// register all needed dependencies
	beforeEach(() => {
		TestBed.configureTestingModule({
			providers: [
				DashboardDetailsComponent
			]
		});
	});

	// instantiation through framework injection
	beforeEach(inject([DashboardDetailsComponent], (DashboardDetailsComponent) => {
		component = DashboardDetailsComponent;
	}));

	it('should have an instance', () => {
		expect(component).toBeDefined();
	});
});