import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomerVehicleEditPhotosComponent } from './customer-vehicle-edit-photos.component';

describe('CustomerVehicleEditPhotosComponent', () => {
  let component: CustomerVehicleEditPhotosComponent;
  let fixture: ComponentFixture<CustomerVehicleEditPhotosComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CustomerVehicleEditPhotosComponent]
    });
    fixture = TestBed.createComponent(CustomerVehicleEditPhotosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
