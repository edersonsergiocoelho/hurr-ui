import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VehicleBrandComponent } from './vehicle-brand.component';

describe('VehicleBrandComponent', () => {
  let component: VehicleBrandComponent;
  let fixture: ComponentFixture<VehicleBrandComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [VehicleBrandComponent]
    });
    fixture = TestBed.createComponent(VehicleBrandComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
