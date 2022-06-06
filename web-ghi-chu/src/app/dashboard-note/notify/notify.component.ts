import { Component, OnInit } from '@angular/core';
import { MessageService } from 'primeng/api';
import { NotificationService } from 'src/app/shared/services/notification.service';

@Component({
  selector: 'app-notify',
  templateUrl: './notify.component.html',
  styleUrls: ['./notify.component.css'],
  providers: [MessageService]
})
export class NotifyComponent implements OnInit {

  constructor(
    private notificationService: NotificationService,
    private messageService: MessageService) { }

  ngOnInit(): void {
    this.loadNotify();
  }

  loadNotify(){
    this.getNotify().subscribe((item:any)=>{
      item.forEach((notify:any) => {
        this.messageService.add({
          key: 'a', sticky: true,
          severity:'error',
          summary:notify?.title + ' đã hết hạn.',
        });
      });
    });
  }

  getNotify(){
    return this.notificationService.getNotify();
  }




  showBottomLeft(){
    this.messageService.add({
      key: 'b', sticky: true,
      severity:'info',
      summary: 'Xem chi tiết',
    });
    this.onRejectA();
  }

  onRejectA() {
      this.messageService.clear('a');
  }
  onRejectB() {
    this.messageService.clear('b');
}
}
