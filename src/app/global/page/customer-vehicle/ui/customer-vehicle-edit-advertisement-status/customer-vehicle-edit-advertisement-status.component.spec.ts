import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomerVehicleEditAdvertisementStatusComponent } from './customer-vehicle-edit-advertisement-status.component';

describe('CustomerVehicleEditAdvertisementStatusComponent', () => {
  let component: CustomerVehicleEditAdvertisementStatusComponent;
  let fixture: ComponentFixture<CustomerVehicleEditAdvertisementStatusComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CustomerVehicleEditAdvertisementStatusComponent]
    });
    fixture = TestBed.createComponent(CustomerVehicleEditAdvertisementStatusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
