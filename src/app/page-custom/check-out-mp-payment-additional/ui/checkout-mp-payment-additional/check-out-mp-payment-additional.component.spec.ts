import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CheckOutMPPaymentAdditionalComponent } from './check-out-mp-payment-additional.component';

describe('CheckOutMPPaymentAdditionalComponent', () => {
  let component: CheckOutMPPaymentAdditionalComponent;
  let fixture: ComponentFixture<CheckOutMPPaymentAdditionalComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CheckOutMPPaymentAdditionalComponent]
    });
    fixture = TestBed.createComponent(CheckOutMPPaymentAdditionalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
