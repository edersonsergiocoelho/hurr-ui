import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomerWithdrawalRequestComponent } from './customer-withdrawal-request.component';

describe('CustomerWithdrawalRequestComponent', () => {
  let component: CustomerWithdrawalRequestComponent;
  let fixture: ComponentFixture<CustomerWithdrawalRequestComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CustomerWithdrawalRequestComponent]
    });
    fixture = TestBed.createComponent(CustomerWithdrawalRequestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
