import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomerVehicleBankAccountSearchComponent } from './customer-vehicle-bank-account-search.component';

describe('CustomerVehicleBankAccountSearchComponent', () => {
  let component: CustomerVehicleBankAccountSearchComponent;
  let fixture: ComponentFixture<CustomerVehicleBankAccountSearchComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CustomerVehicleBankAccountSearchComponent]
    });
    fixture = TestBed.createComponent(CustomerVehicleBankAccountSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
