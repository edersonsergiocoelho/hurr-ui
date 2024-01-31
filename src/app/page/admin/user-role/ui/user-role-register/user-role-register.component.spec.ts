import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserRoleRegisterComponent } from './user-role-register.component';

describe('UserRoleRegisterComponent', () => {
  let component: UserRoleRegisterComponent;
  let fixture: ComponentFixture<UserRoleRegisterComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [UserRoleRegisterComponent]
    });
    fixture = TestBed.createComponent(UserRoleRegisterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
