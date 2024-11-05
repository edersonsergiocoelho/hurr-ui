import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PaymentMethodSearchComponent } from './payment-method-search.component';

describe('PaymentMethodSearchComponent', () => {
  let component: PaymentMethodSearchComponent;
  let fixture: ComponentFixture<PaymentMethodSearchComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PaymentMethodSearchComponent]
    });
    fixture = TestBed.createComponent(PaymentMethodSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
