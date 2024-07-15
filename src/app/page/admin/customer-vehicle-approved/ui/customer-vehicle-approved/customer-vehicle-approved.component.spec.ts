import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomerVehicleApprovedComponent } from './customer-vehicle-approved.component';

describe('CustomerVehicleApprovedComponent', () => {
  let component: CustomerVehicleApprovedComponent;
  let fixture: ComponentFixture<CustomerVehicleApprovedComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CustomerVehicleApprovedComponent]
    });
    fixture = TestBed.createComponent(CustomerVehicleApprovedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
