import { NotificationService } from './../../../shared/services/notification.service';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-notification-list',
  templateUrl: './notification-list.component.html',
  styleUrls: ['./notification-list.component.css']
})
export class NotificationListComponent implements OnInit {

  @Input() listNotification: any;
  @Output() loadDataEmit: EventEmitter<any>;

  constructor(private notificationService: NotificationService) {
    this.loadDataEmit = new EventEmitter();
  }

  ngOnInit(): void {
  }

  loadData(){
    this.loadDataEmit.emit()
  }
}
