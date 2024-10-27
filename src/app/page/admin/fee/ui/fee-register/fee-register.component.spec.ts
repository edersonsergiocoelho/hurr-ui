import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FeeRegisterComponent } from './fee-register.component';

describe('FeeRegisterComponent', () => {
  let component: FeeRegisterComponent;
  let fixture: ComponentFixture<FeeRegisterComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FeeRegisterComponent]
    });
    fixture = TestBed.createComponent(FeeRegisterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
