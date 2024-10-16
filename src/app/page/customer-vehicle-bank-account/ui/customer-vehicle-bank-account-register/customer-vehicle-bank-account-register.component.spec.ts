import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomerVehicleBankAccountRegisterComponent } from './customer-vehicle-bank-account-register.component';

describe('CustomerVehicleBankAccountRegisterComponent', () => {
  let component: CustomerVehicleBankAccountRegisterComponent;
  let fixture: ComponentFixture<CustomerVehicleBankAccountRegisterComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CustomerVehicleBankAccountRegisterComponent]
    });
    fixture = TestBed.createComponent(CustomerVehicleBankAccountRegisterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
