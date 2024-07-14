import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomerVehicleRegisterStep6Component } from './customer-vehicle-register-step6.component';

describe('CustomerVehicleRegisterStep6Component', () => {
  let component: CustomerVehicleRegisterStep6Component;
  let fixture: ComponentFixture<CustomerVehicleRegisterStep6Component>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CustomerVehicleRegisterStep6Component]
    });
    fixture = TestBed.createComponent(CustomerVehicleRegisterStep6Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
