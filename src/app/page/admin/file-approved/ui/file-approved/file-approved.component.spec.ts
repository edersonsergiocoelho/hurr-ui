import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FileApprovedComponent } from './file-approved.component';

describe('FileApprovedComponent', () => {
  let component: FileApprovedComponent;
  let fixture: ComponentFixture<FileApprovedComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FileApprovedComponent]
    });
    fixture = TestBed.createComponent(FileApprovedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
