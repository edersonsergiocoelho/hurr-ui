import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomerVehicleEditPriceDiscountComponent } from './customer-vehicle-edit-price-discount.component';

describe('CustomerVehicleEditPriceDiscountComponent', () => {
  let component: CustomerVehicleEditPriceDiscountComponent;
  let fixture: ComponentFixture<CustomerVehicleEditPriceDiscountComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CustomerVehicleEditPriceDiscountComponent]
    });
    fixture = TestBed.createComponent(CustomerVehicleEditPriceDiscountComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
