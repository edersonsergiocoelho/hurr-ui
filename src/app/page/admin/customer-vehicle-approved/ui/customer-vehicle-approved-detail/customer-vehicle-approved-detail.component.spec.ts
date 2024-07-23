import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomerVehicleApprovedDetailComponent } from './customer-vehicle-approved-detail.component';

describe('CustomerVehicleApprovedDetailComponent', () => {
  let component: CustomerVehicleApprovedDetailComponent;
  let fixture: ComponentFixture<CustomerVehicleApprovedDetailComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CustomerVehicleApprovedDetailComponent]
    });
    fixture = TestBed.createComponent(CustomerVehicleApprovedDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
