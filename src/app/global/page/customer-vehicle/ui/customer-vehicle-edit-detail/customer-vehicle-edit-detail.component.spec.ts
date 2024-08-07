import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomerVehicleEditDetailComponent } from './customer-vehicle-edit-detail.component';

describe('CustomerVehicleEditDetailComponent', () => {
  let component: CustomerVehicleEditDetailComponent;
  let fixture: ComponentFixture<CustomerVehicleEditDetailComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CustomerVehicleEditDetailComponent]
    });
    fixture = TestBed.createComponent(CustomerVehicleEditDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
