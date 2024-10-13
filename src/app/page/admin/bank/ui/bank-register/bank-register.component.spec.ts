import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BankRegisterComponent } from './bank-register.component';

describe('BankRegisterComponent', () => {
  let component: BankRegisterComponent;
  let fixture: ComponentFixture<BankRegisterComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [BankRegisterComponent]
    });
    fixture = TestBed.createComponent(BankRegisterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
