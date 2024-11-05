import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomerVehicleBankAccountComponent } from './customer-vehicle-bank-account.component';

describe('CustomerVehicleBankAccountComponent', () => {
  let component: CustomerVehicleBankAccountComponent;
  let fixture: ComponentFixture<CustomerVehicleBankAccountComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CustomerVehicleBankAccountComponent]
    });
    fixture = TestBed.createComponent(CustomerVehicleBankAccountComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
