import { PriorityService } from './../../../shared/services/priority.service';
import { Component, OnInit, Output, EventEmitter, ElementRef, HostListener } from '@angular/core';
import { NoteRequest } from 'src/app/shared/models/note-request.model';
import { NoteService } from 'src/app/shared/services/note.service';
import { FormBuilder, FormGroup } from '@angular/forms';

export interface PriorityRadio{
  key: number,
  name: string,
}

@Component({
  selector: 'app-edit-note-bar',
  templateUrl: './edit-note-bar.component.html',
  styleUrls: ['./edit-note-bar.component.css']
})
export class EditNoteBarComponent implements OnInit {
  @Output() LoadDataEvent: EventEmitter<any>;

  showNoteBar: boolean;
  showEditNote: boolean;

  /**
   * priority
   */
  selectedPriority: any;

  priorities: PriorityRadio[]

  /**
   * Dữ liệu
   */
  noteRequest: NoteRequest;


  constructor(
    private noteService: NoteService,
    private priorityService: PriorityService,
    private eRef: ElementRef,
    private fb: FormBuilder
  ) {
    this.showNoteBar = true;
    this.showEditNote = false;
    this.noteRequest = new NoteRequest("", "", "", 0)
    this.LoadDataEvent = new EventEmitter();
    this.priorities = [];
    this.selectedPriority = null;
  }

  ngOnInit(): void {
    this.initPriorities();
  }

  @HostListener('document:click', ['$event'])
  click(event: any) {
    if(!this.eRef.nativeElement.contains(event.target)) {
      if(this.showEditNote){
        this.saveAndClose(event);
      }
    }else{
      this.showHeaderAndFooter(event);
    }
  }

  showHeaderAndFooter(event: any){
    this.showNoteBar = false;
    this.showEditNote = true;
  }

  saveAndClose(event: any){

    if(this.isEmpty(this.noteRequest.title) && this.isBlank(this.noteRequest.title)){
      if(this.isEmpty(this.noteRequest.description) && this.isBlank(this.noteRequest.description)){
        this.handleClose();
      }
      else{
        this.noteRequest.priorityId = this.selectedPriority?.key;
        this.noteService.createNote(this.noteRequest).subscribe((item)=>{
          this.handleClose();
          this.LoadDataEvent.emit();
        })
      }
    }else{
      this.noteRequest.priorityId = this.selectedPriority?.key;
      this.noteService.createNote(this.noteRequest).subscribe((item)=>{
        this.handleClose();
        this.LoadDataEvent.emit();
      })
    }

  }

  handleClose(){
    this.noteRequest.description = '';
    this.noteRequest.title = '';
    this.showNoteBar = true;
    this.showEditNote = false;
  }

  initPriorities(){
    this.priorityService.getAllPriority().subscribe((data: any[])=>{
      this.priorities = data.map((item)=>({
        name: item?.name,
        key: item?.priorityId
      }))
      this.selectedPriority = this.priorities[0];
    });
  }

  isEmpty(str: string) {
    return (!str || str.length === 0 );
  }

  isBlank(str: string){
    return (!str || /^\s*$/.test(str));
  }

}
