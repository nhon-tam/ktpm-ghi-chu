import { Component, OnInit } from '@angular/core';
import { NoteRequest } from 'src/app/shared/models/note-request.model';
import { NoteService } from 'src/app/shared/services/note.service';

@Component({
  selector: 'app-edit-note-modal',
  templateUrl: './edit-note-modal.component.html',
  styleUrls: ['./edit-note-modal.component.css']
})
export class EditNoteModalComponent implements OnInit {

  isSpinning: boolean;

  constructor(private noteService: NoteService) {
    this.isSpinning = false
  }

  ngOnInit(): void {
    // this.getNoteDetail();
  }

  // getNoteDetail(){
  //   this.isSpinning = true;

  //   this.getDetailFromServer(this.noteItem?.noteId).subscribe((res: any)=>{

  //     setTimeout(()=>{
  //       this.noteRequest.description = res?.description;
  //       this.noteRequest.title = res?.title;
  //       this.isSpinning = false;
  //     }, 1000)
  //   })
  // }

  /**
   * API
   */


  deleteNote(noteId: string){
    return this.noteService.deleteNote(noteId);
  }

  getDetailFromServer(noteId: string){
    return this.noteService.detailNote(noteId);
  }

  updateNoteToServer(noteRequest: NoteRequest){
    return this.noteService.updateNote(noteRequest);
  }

  isEmpty(str: string) {
    return (!str || str.length === 0 );
  }

  isBlank(str: string){
    return (!str || /^\s*$/.test(str));
  }

}
