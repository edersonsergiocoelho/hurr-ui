import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomerVehicleEditComponent } from './customer-vehicle-edit.component';

describe('CustomerVehicleEditComponent', () => {
  let component: CustomerVehicleEditComponent;
  let fixture: ComponentFixture<CustomerVehicleEditComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CustomerVehicleEditComponent]
    });
    fixture = TestBed.createComponent(CustomerVehicleEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
