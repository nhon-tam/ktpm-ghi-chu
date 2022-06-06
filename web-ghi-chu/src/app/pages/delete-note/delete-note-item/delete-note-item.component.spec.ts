import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteNoteItemComponent } from './delete-note-item.component';

describe('DeleteNoteItemComponent', () => {
  let component: DeleteNoteItemComponent;
  let fixture: ComponentFixture<DeleteNoteItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DeleteNoteItemComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DeleteNoteItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
