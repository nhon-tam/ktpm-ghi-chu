import { CommonService } from './../../../shared/services/common.service';
import { DeleteNoteService } from './../../../shared/services/delete-note.service';

import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ConfirmationService } from 'primeng/api';

@Component({
  selector: 'app-delete-note-item',
  templateUrl: './delete-note-item.component.html',
  styleUrls: ['./delete-note-item.component.css']
})
export class DeleteNoteItemComponent implements OnInit {
  @Input() note :any;
  @Output() deleteEvent: EventEmitter<any>;

  listLayout: boolean;
  styleItem: any;

  constructor(
    private deleteNoteService: DeleteNoteService,
    private commonSerivce: CommonService,
    private confirmationService: ConfirmationService
    ) {
    this.deleteEvent = new EventEmitter();
    this.listLayout = false;
  }

  ngOnInit(): void {
    this.commonSerivce.listLayout$.subscribe((active)=>{
      this.listLayout = active;
      this.changeStyleNote()

    })
  }


  changeStyleNote(){

    if(this.listLayout){
      this.styleItem = {
        'width': '40rem'
        ,'height': '14rem'
        , 'margin-top': '20px'
        ,'overflow': 'auto'
        };
    }
    else{
      this.styleItem ={'width': '17rem'
          , 'margin': '0.3em'
          , 'margin-top': '1em'
          };
    }
  }



  revertDeleteNote(){
    this.revertDelete(this.note?.noteId).subscribe((res)=>{
      this.deleteEvent.emit()
    })
  }

  deleteNote(){

    this.confirmationService.confirm({
      message: 'Bạn có muốn xóa vĩnh viễn ghi chú này không?',
      header: 'Xác nhận',
      icon: 'pi pi-exclamation-triangle',
      acceptLabel:'Đồng ý',
      rejectLabel: 'Hủy',
      accept: () => {
        this.delete(this.note?.noteId).subscribe((res)=>{
          this.deleteEvent.emit()
          this.confirmationService.close();
        })
      },
      reject: () => {
        this.confirmationService.close();
      }
    });
  }


  /**
   * Load Api
   *
   */

  revertDelete(noteId: string){
    return this.deleteNoteService.revertDeleteNote(noteId);
  }

  delete(noteId: string){
    return this.deleteNoteService.deleteNote(noteId);
  }

}
