import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CheckOutMPComponent } from './check-out-mp.component';

describe('CheckOutMPComponent', () => {
  let component: CheckOutMPComponent;
  let fixture: ComponentFixture<CheckOutMPComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CheckOutMPComponent]
    });
    fixture = TestBed.createComponent(CheckOutMPComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
