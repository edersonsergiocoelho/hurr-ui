import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserPreferenceContentComponent } from './user-preference-content.component';

describe('UserPreferenceContentComponent', () => {
  let component: UserPreferenceContentComponent;
  let fixture: ComponentFixture<UserPreferenceContentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UserPreferenceContentComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(UserPreferenceContentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
