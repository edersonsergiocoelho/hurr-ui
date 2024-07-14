import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomerVehicleRegisterStep4Component } from './customer-vehicle-register-step4.component';

describe('CustomerVehicleRegisterStep4Component', () => {
  let component: CustomerVehicleRegisterStep4Component;
  let fixture: ComponentFixture<CustomerVehicleRegisterStep4Component>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CustomerVehicleRegisterStep4Component]
    });
    fixture = TestBed.createComponent(CustomerVehicleRegisterStep4Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
