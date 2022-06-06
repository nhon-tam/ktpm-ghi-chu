import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditNoteBarComponent } from './edit-note-bar.component';

describe('EditNoteBarComponent', () => {
  let component: EditNoteBarComponent;
  let fixture: ComponentFixture<EditNoteBarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditNoteBarComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditNoteBarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
