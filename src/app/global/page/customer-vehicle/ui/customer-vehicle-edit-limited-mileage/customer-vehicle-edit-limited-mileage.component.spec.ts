import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomerVehicleEditLimitedMileageComponent } from './customer-vehicle-edit-limited-mileage.component';

describe('CustomerVehicleEditLimitedMileageComponent', () => {
  let component: CustomerVehicleEditLimitedMileageComponent;
  let fixture: ComponentFixture<CustomerVehicleEditLimitedMileageComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CustomerVehicleEditLimitedMileageComponent]
    });
    fixture = TestBed.createComponent(CustomerVehicleEditLimitedMileageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
