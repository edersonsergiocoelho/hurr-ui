import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VehicleBrandRegisterComponent } from './vehicle-brand-register.component';

describe('VehicleBrandRegisterComponent', () => {
  let component: VehicleBrandRegisterComponent;
  let fixture: ComponentFixture<VehicleBrandRegisterComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [VehicleBrandRegisterComponent]
    });
    fixture = TestBed.createComponent(VehicleBrandRegisterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});