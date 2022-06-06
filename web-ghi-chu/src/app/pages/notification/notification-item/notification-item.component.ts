import { NotificationService } from './../../../shared/services/notification.service';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';


@Component({
  selector: 'app-notification-item',
  templateUrl: './notification-item.component.html',
  styleUrls: ['./notification-item.component.css']
})
export class NotificationItemComponent implements OnInit {

  @Input() noteItem :any;
  @Output() changeData: EventEmitter<any>;

  constructor(private notificationService: NotificationService) {
    this.changeData = new EventEmitter();
  }

  ngOnInit(): void {
  }

}
