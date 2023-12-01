import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeSearchCarsComponent } from './home-search-cars.component';

describe('HomeSearchCarsComponent', () => {
  let component: HomeSearchCarsComponent;
  let fixture: ComponentFixture<HomeSearchCarsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [HomeSearchCarsComponent]
    });
    fixture = TestBed.createComponent(HomeSearchCarsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
