import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PaymentStatusSearchComponent } from './payment-status-search.component';

describe('PaymentStatusSearchComponent', () => {
  let component: PaymentStatusSearchComponent;
  let fixture: ComponentFixture<PaymentStatusSearchComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PaymentStatusSearchComponent]
    });
    fixture = TestBed.createComponent(PaymentStatusSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
