import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomerVehicleRegisterStep1Component } from './customer-vehicle-register-step1.component';

describe('CustomerVehicleRegisterStep1Component', () => {
  let component: CustomerVehicleRegisterStep1Component;
  let fixture: ComponentFixture<CustomerVehicleRegisterStep1Component>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CustomerVehicleRegisterStep1Component]
    });
    fixture = TestBed.createComponent(CustomerVehicleRegisterStep1Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
