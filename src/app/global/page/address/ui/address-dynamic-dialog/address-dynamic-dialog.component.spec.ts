import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddressDynamicDialogComponent } from './address-dynamic-dialog.component';

describe('AddressDynamicDialogComponent', () => {
  let component: AddressDynamicDialogComponent;
  let fixture: ComponentFixture<AddressDynamicDialogComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AddressDynamicDialogComponent]
    });
    fixture = TestBed.createComponent(AddressDynamicDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
