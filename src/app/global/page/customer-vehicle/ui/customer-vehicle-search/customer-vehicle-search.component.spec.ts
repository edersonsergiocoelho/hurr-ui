import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomerVehicleSearchComponent } from './customer-vehicle-search.component';

describe('CustomerVehicleSearchComponent', () => {
  let component: CustomerVehicleSearchComponent;
  let fixture: ComponentFixture<CustomerVehicleSearchComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CustomerVehicleSearchComponent]
    });
    fixture = TestBed.createComponent(CustomerVehicleSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
