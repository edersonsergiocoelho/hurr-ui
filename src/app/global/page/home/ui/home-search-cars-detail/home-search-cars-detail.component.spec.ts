import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeSearchCarsDetailComponent } from './home-search-cars-detail.component';

describe('HomeSearchCarsDetailComponent', () => {
  let component: HomeSearchCarsDetailComponent;
  let fixture: ComponentFixture<HomeSearchCarsDetailComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [HomeSearchCarsDetailComponent]
    });
    fixture = TestBed.createComponent(HomeSearchCarsDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
