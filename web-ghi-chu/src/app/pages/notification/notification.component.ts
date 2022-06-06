import { NotificationService } from './../../shared/services/notification.service';
import { Component, OnInit } from '@angular/core';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-notification',
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.css'],
  providers: [MessageService]
})
export class NotificationComponent implements OnInit {

  isSpinning: boolean;

  notificationlist: any;

  constructor(
    private notificationService: NotificationService,
    private messageService: MessageService ) {
    this.isSpinning= false;
  }

  ngOnInit(): void {
    this.loadNotificationData();
  }

  loadNotificationData(){
    this.isSpinning = true;
    this.getNoteData().subscribe((item)=>{
      this.messageService.add({severity:'success', summary:'Cập nhật thành công!', detail:'Cập nhật dữ liệu từ server thành công!'});
      setTimeout(()=>{
        this.notificationlist = item;
        this.isSpinning = false;
      }, 1000)
    });
  }

  getNoteData(){
    return this.notificationService.getAll();
  }
}
