import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardNoteComponent } from './dashboard-note.component';

describe('DashboardNoteComponent', () => {
  let component: DashboardNoteComponent;
  let fixture: ComponentFixture<DashboardNoteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DashboardNoteComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DashboardNoteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
