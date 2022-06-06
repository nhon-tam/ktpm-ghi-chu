import { CommonService } from './../../shared/services/common.service';
import { MessageService } from 'primeng/api';
import { NoteService } from './../../shared/services/note.service';
import { NoteRequest } from './../../shared/models/note-request.model';
import { Component, OnInit } from '@angular/core';
import { debounce, debounceTime } from 'rxjs';

@Component({
  selector: 'app-note',
  templateUrl: './note.component.html',
  styleUrls: ['./note.component.css'],
  providers: [MessageService]
})
export class NoteComponent implements OnInit {

  /**
   * Hiển thị
   */
  isSpinning: boolean;
  showNoteBar: boolean;
  showEditNote: boolean;

  /**
   * Dữ liệu
   */
  noteList: any;

  constructor(
    private noteService: NoteService,
    private messageService: MessageService,
    private commonService: CommonService
  ) {
    this.showNoteBar = true;
    this.showEditNote = false;
    this.isSpinning = false;
  }

  ngOnInit(): void {
    this.loadNoteData();
    this.commonService.reload$.subscribe((active)=>{
      if(active){
        this.loadNoteData();
        this.commonService.activeReload(false);
      }
    })
  }




  loadNoteData(){
    this.isSpinning = true;

    this.commonService.search$.pipe(debounceTime(1000)).subscribe((search: string)=>{

      this.noteService.search(search).subscribe((item)=>{
            this.noteList = item;
            this.isSpinning = false;
      })

    })
  }






}
