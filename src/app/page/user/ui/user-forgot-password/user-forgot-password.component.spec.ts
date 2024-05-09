import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserForgotPasswordComponent } from './user-forgot-password.component';

describe('UserForgotPasswordComponent', () => {
  let component: UserForgotPasswordComponent;
  let fixture: ComponentFixture<UserForgotPasswordComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [UserForgotPasswordComponent]
    });
    fixture = TestBed.createComponent(UserForgotPasswordComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
