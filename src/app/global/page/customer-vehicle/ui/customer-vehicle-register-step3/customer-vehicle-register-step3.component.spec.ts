import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomerVehicleRegisterStep3Component } from './customer-vehicle-register-step3.component';

describe('CustomerVehicleRegisterStep3Component', () => {
  let component: CustomerVehicleRegisterStep3Component;
  let fixture: ComponentFixture<CustomerVehicleRegisterStep3Component>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CustomerVehicleRegisterStep3Component]
    });
    fixture = TestBed.createComponent(CustomerVehicleRegisterStep3Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
