import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomerVehicleEditAddressesRegisterComponent } from './customer-vehicle-edit-addresses-register.component';

describe('CustomerVehicleEditAddressesRegisterComponent', () => {
  let component: CustomerVehicleEditAddressesRegisterComponent;
  let fixture: ComponentFixture<CustomerVehicleEditAddressesRegisterComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CustomerVehicleEditAddressesRegisterComponent]
    });
    fixture = TestBed.createComponent(CustomerVehicleEditAddressesRegisterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
