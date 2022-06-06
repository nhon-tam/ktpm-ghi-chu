import { ToastModule } from 'primeng/toast';
import { MessagesModule } from 'primeng/messages';
import { MessageModule } from 'primeng/message';
import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DeleteNoteComponent } from './delete-note.component';
import { DeleteNoteRoutingModule } from './delete-note-routing.module';
import { RippleModule } from 'primeng/ripple';
import { DeleteNoteItemComponent } from './delete-note-item/delete-note-item.component';
import { DeleteNoteListComponent } from './delete-note-list/delete-note-list.component';
import { NzSpinModule } from 'ng-zorro-antd/spin';
import {ConfirmDialogModule} from 'primeng/confirmdialog';
import {ConfirmationService} from 'primeng/api';

@NgModule({
  declarations: [
    DeleteNoteComponent,
    DeleteNoteItemComponent,
    DeleteNoteListComponent
  ],
  imports: [
    CommonModule,
    ButtonModule,
    CardModule,
    DeleteNoteRoutingModule,
    RippleModule,
    MessageModule,
    MessagesModule,
    ToastModule,
    NzSpinModule,
    ConfirmDialogModule
  ],
  exports:[
    DeleteNoteComponent
  ],
  providers:[
    ConfirmationService
  ]
})
export class DeleteNoteModule { }
