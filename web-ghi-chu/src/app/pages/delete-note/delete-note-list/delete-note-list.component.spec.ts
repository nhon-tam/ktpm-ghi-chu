import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteNoteListComponent } from './delete-note-list.component';

describe('DeleteNoteListComponent', () => {
  let component: DeleteNoteListComponent;
  let fixture: ComponentFixture<DeleteNoteListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DeleteNoteListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DeleteNoteListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
