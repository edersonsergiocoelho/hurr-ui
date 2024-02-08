import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FileApprovedDetailComponent } from './file-approved-detail.component';

describe('FileApprovedDetailComponent', () => {
  let component: FileApprovedDetailComponent;
  let fixture: ComponentFixture<FileApprovedDetailComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FileApprovedDetailComponent]
    });
    fixture = TestBed.createComponent(FileApprovedDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
