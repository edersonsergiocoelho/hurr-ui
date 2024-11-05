import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FeeSearchComponent } from './fee-search.component';

describe('FeeSearchComponent', () => {
  let component: FeeSearchComponent;
  let fixture: ComponentFixture<FeeSearchComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FeeSearchComponent]
    });
    fixture = TestBed.createComponent(FeeSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
