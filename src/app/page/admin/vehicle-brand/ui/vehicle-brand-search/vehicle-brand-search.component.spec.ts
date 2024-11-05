import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VehicleBrandSearchComponent } from './vehicle-brand-search.component';

describe('VehicleBrandSearchComponent', () => {
  let component: VehicleBrandSearchComponent;
  let fixture: ComponentFixture<VehicleBrandSearchComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [VehicleBrandSearchComponent]
    });
    fixture = TestBed.createComponent(VehicleBrandSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
