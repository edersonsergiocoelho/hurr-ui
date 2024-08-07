import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomerVehicleEditAddressesSearchComponent } from './customer-vehicle-edit-addresses-search.component';

describe('CustomerVehicleEditAddressesSearchComponent', () => {
  let component: CustomerVehicleEditAddressesSearchComponent;
  let fixture: ComponentFixture<CustomerVehicleEditAddressesSearchComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CustomerVehicleEditAddressesSearchComponent]
    });
    fixture = TestBed.createComponent(CustomerVehicleEditAddressesSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
