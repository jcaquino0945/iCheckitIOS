import { TestBed, inject } from '@angular/core/testing';

import { FaqsComponent } from './Faqs.component';

describe('a Faqs component', () => {
	let component: FaqsComponent;

	// register all needed dependencies
	beforeEach(() => {
		TestBed.configureTestingModule({
			providers: [
				FaqsComponent
			]
		});
	});

	// instantiation through framework injection
	beforeEach(inject([FaqsComponent], (FaqsComponent) => {
		component = FaqsComponent;
	}));

	it('should have an instance', () => {
		expect(component).toBeDefined();
	});
});