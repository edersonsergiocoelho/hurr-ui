import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FileApprovedSearchComponent } from './file-approved-search.component';

describe('FileApprovedSearchComponent', () => {
  let component: FileApprovedSearchComponent;
  let fixture: ComponentFixture<FileApprovedSearchComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FileApprovedSearchComponent]
    });
    fixture = TestBed.createComponent(FileApprovedSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
