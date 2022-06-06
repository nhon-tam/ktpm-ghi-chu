import { CommonService } from './../../shared/services/common.service';
import { MessageService, ConfirmationService } from 'primeng/api';
import { DeleteNoteService } from './../../shared/services/delete-note.service';
import { NoteRequest } from './../../shared/models/note-request.model';
import { Component, OnInit } from '@angular/core';
import { debounceTime } from 'rxjs/operators';

@Component({
  selector: 'app-delete-note',
  templateUrl: './delete-note.component.html',
  styleUrls: ['./delete-note.component.css'],
  providers: [MessageService]

})
export class DeleteNoteComponent implements OnInit {

  /**
 * Hiển thị
 */
  isSpinning: boolean;

  // noteRequest: NoteRequest;
  deletenotelist: any;
  filter: string;

  constructor(
    private deleteNoteService : DeleteNoteService,
    private messageService: MessageService,
    private commonService: CommonService,
    private confirmationService: ConfirmationService
    ) {
      // this.noteRequest = new NoteRequest("","", "", 0)
      this.isSpinning = false;
      this.filter = '';
    }

  ngOnInit(): void {
    this.loadSearch();


    this.commonService.reload$.subscribe((active)=>{
      if(active){
        this.loadSearch();
        this.commonService.activeReload(false);
      }
    })
    this.deleteNoteService.deleteEndTime().subscribe(()=>{
      return true;
    });

  }


  loadDeleteNote(){
    this.isSpinning = true;
    this.getNoteData().subscribe((item)=>{

    });
  }


  loadSearch(){
    this.isSpinning = true;
    this.commonService.search$.pipe(debounceTime(1000)).subscribe((f)=>{
      this.deleteNoteService.search(f).pipe(debounceTime(1000)).subscribe((item)=>{
          this.deletenotelist = item;
          this.isSpinning = false;
          this.handleClose();
      })
    })

  }

  getNoteData(){
    return this.deleteNoteService.getAllNoteDelete();
  }

  handleClose(){
    // this.noteRequest.description = '';
    // this.noteRequest.title = '';
  }

  deleteAll(){
    this.confirmationService.confirm({
      message: 'Bạn có muốn xóa vĩnh viễn toàn bộ ghi chú trong thùng tác không?',
      header: 'Xác nhận',
      icon: 'pi pi-exclamation-triangle',
      acceptLabel:'Đồng ý',
      rejectLabel: 'Hủy',
      accept: () => {
        this.deleteNoteService.deleteAll().subscribe(()=>{
          this.loadSearch();
          this.confirmationService.close();
        });
      },
      reject: () => {
        this.confirmationService.close();
      }
    });

  }
}
