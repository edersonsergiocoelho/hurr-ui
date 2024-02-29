import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CheckoutMercadoPagoComponent } from './checkout-mercado-pago.component';

describe('CheckoutMercadoPagoComponent', () => {
  let component: CheckoutMercadoPagoComponent;
  let fixture: ComponentFixture<CheckoutMercadoPagoComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CheckoutMercadoPagoComponent]
    });
    fixture = TestBed.createComponent(CheckoutMercadoPagoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
