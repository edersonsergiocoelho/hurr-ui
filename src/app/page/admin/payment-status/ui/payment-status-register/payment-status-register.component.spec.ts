import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PaymentStatusRegisterComponent } from './payment-status-register.component';

describe('PaymentStatusRegisterComponent', () => {
  let component: PaymentStatusRegisterComponent;
  let fixture: ComponentFixture<PaymentStatusRegisterComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PaymentStatusRegisterComponent]
    });
    fixture = TestBed.createComponent(PaymentStatusRegisterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
