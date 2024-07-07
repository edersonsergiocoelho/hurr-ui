import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomerVehicleRegisterStep7Component } from './customer-vehicle-register-step7.component';

describe('CustomerVehicleRegisterStep7Component', () => {
  let component: CustomerVehicleRegisterStep7Component;
  let fixture: ComponentFixture<CustomerVehicleRegisterStep7Component>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CustomerVehicleRegisterStep7Component]
    });
    fixture = TestBed.createComponent(CustomerVehicleRegisterStep7Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
