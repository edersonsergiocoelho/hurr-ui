import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomerVehicleRegisterStep5Component } from './customer-vehicle-register-step5.component';

describe('CustomerVehicleRegisterStep5Component', () => {
  let component: CustomerVehicleRegisterStep5Component;
  let fixture: ComponentFixture<CustomerVehicleRegisterStep5Component>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CustomerVehicleRegisterStep5Component]
    });
    fixture = TestBed.createComponent(CustomerVehicleRegisterStep5Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
