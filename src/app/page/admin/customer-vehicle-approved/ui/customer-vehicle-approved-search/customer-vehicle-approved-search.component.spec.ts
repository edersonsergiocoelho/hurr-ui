import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomerVehicleApprovedSearchComponent } from './customer-vehicle-approved-search.component';

describe('CustomerVehicleApprovedSearchComponent', () => {
  let component: CustomerVehicleApprovedSearchComponent;
  let fixture: ComponentFixture<CustomerVehicleApprovedSearchComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CustomerVehicleApprovedSearchComponent]
    });
    fixture = TestBed.createComponent(CustomerVehicleApprovedSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
