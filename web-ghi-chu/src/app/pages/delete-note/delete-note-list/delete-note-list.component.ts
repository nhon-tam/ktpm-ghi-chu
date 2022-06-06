import { CommonService } from './../../../shared/services/common.service';
import { DeleteNoteService } from './../../../shared/services/delete-note.service';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';


@Component({
  selector: 'app-delete-note-list',
  templateUrl: './delete-note-list.component.html',
  styleUrls: ['./delete-note-list.component.css']
})
export class DeleteNoteListComponent implements OnInit {

  @Input() listNote: any;
  @Output() loadDataEmit: EventEmitter<any>;

  listLayout: boolean;

  constructor(
    private commonSerivce: CommonService,
    private DeleteNoteService: DeleteNoteService
    ) {
    this.loadDataEmit = new EventEmitter();
    this.listLayout = false;
  }

  ngOnInit(): void {
    this.commonSerivce.listLayout$.subscribe((active)=>{
      this.listLayout = active
    })
  }

  loadDataNote(){
    this.loadDataEmit.emit()
  }
}
