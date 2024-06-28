import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomerVehicleRegisterComponent } from './customer-vehicle-register.component';

describe('CustomerVehicleRegisterComponent', () => {
  let component: CustomerVehicleRegisterComponent;
  let fixture: ComponentFixture<CustomerVehicleRegisterComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CustomerVehicleRegisterComponent]
    });
    fixture = TestBed.createComponent(CustomerVehicleRegisterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
