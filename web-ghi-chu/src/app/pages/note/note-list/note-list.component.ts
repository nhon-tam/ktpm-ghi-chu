import { CommonService } from './../../../shared/services/common.service';
import { NoteService } from './../../../shared/services/note.service';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-note-list',
  templateUrl: './note-list.component.html',
  styleUrls: ['./note-list.component.css']
})
export class NoteListComponent implements OnInit {
  @Input() listNote: any;
  @Output() loadDataEmit: EventEmitter<any>;

  listLayout: boolean;

  constructor(private noteService: NoteService,
              private commonService: CommonService) {
    this.loadDataEmit = new EventEmitter();
    this.listLayout = false;
  }

  ngOnInit(): void {
    this.commonService.listLayout$.subscribe((active)=>{
      this.listLayout = active;
    })
  }

  loadDataNote(){
    this.loadDataEmit.emit()
  }

}
