import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserRoleEditRoleComponentComponent } from './user-role-edit-role-component.component';

describe('UserRoleEditRoleComponentComponent', () => {
  let component: UserRoleEditRoleComponentComponent;
  let fixture: ComponentFixture<UserRoleEditRoleComponentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UserRoleEditRoleComponentComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(UserRoleEditRoleComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
