import { NoteModule } from './../note/note.module';
import { EditNoteBarComponent } from './../note/edit-note-bar/edit-note-bar.component';
import { ButtonModule } from 'primeng/button';

import { MessageModule } from 'primeng/message';
import { NotificationRoutingModule } from './notification-routing.module';
import { ToastModule } from 'primeng/toast';
import { NzSpinModule } from 'ng-zorro-antd/spin';
import { CardModule } from 'primeng/card';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NotificationComponent } from './notification.component';

import { MessagesModule } from 'primeng/messages';
import { NotificationItemComponent } from './notification-item/notification-item.component';
import { NotificationListComponent } from './notification-list/notification-list.component';
import { RippleModule } from 'primeng/ripple';




@NgModule({
  declarations: [
    NotificationComponent,
    NotificationItemComponent,
    NotificationListComponent,
  ],
  imports: [
    CommonModule,
    CardModule,
    NzSpinModule,
    ToastModule,
    RippleModule,
    NotificationRoutingModule,
    MessageModule,
    MessagesModule,
    ButtonModule,
    NoteModule,
  ],
  exports:[
    NotificationComponent,
  ]
})
export class NotificationModule { }
