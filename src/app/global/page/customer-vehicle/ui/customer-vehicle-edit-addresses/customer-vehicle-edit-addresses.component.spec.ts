import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomerVehicleEditAddressesComponent } from './customer-vehicle-edit-addresses.component';

describe('CustomerVehicleEditAddressesComponent', () => {
  let component: CustomerVehicleEditAddressesComponent;
  let fixture: ComponentFixture<CustomerVehicleEditAddressesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CustomerVehicleEditAddressesComponent]
    });
    fixture = TestBed.createComponent(CustomerVehicleEditAddressesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
