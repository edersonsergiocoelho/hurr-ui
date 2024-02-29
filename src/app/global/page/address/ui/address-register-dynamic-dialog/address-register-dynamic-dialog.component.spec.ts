import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddressRegisterDynamicDialogComponent } from './address-register-dynamic-dialog.component';

describe('AddressRegisterDynamicDialogComponent', () => {
  let component: AddressRegisterDynamicDialogComponent;
  let fixture: ComponentFixture<AddressRegisterDynamicDialogComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AddressRegisterDynamicDialogComponent]
    });
    fixture = TestBed.createComponent(AddressRegisterDynamicDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
