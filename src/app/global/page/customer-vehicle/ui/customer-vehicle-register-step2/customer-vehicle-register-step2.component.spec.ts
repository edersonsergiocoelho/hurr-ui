import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomerVehicleRegisterStep2Component } from './customer-vehicle-register-step2.component';

describe('CustomerVehicleRegisterStep2Component', () => {
  let component: CustomerVehicleRegisterStep2Component;
  let fixture: ComponentFixture<CustomerVehicleRegisterStep2Component>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CustomerVehicleRegisterStep2Component]
    });
    fixture = TestBed.createComponent(CustomerVehicleRegisterStep2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
