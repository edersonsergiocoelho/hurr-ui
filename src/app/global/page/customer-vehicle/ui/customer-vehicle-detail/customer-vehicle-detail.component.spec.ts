import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomerVehicleDetailComponent } from './customer-vehicle-detail.component';

describe('CustomerVehicleDetailComponent', () => {
  let component: CustomerVehicleDetailComponent;
  let fixture: ComponentFixture<CustomerVehicleDetailComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CustomerVehicleDetailComponent]
    });
    fixture = TestBed.createComponent(CustomerVehicleDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
