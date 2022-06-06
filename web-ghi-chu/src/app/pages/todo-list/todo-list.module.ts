import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { MessagesModule } from 'primeng/messages';
import { MessageModule } from 'primeng/message';
import { ToastModule } from 'primeng/toast';
import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TodoListComponent } from './todo-list.component';
import {CardModule} from 'primeng/card';
import { NzSpinModule } from 'ng-zorro-antd/spin';
import {InputTextModule} from 'primeng/inputtext';
import { Button, ButtonModule } from 'primeng/button';
import { TaskListComponent } from './task-list/task-list.component';
import { TaskItemComponent } from './task-item/task-item.component';
import { MessageService } from 'primeng/api';
import {CheckboxModule} from 'primeng/checkbox';
import { DialogModule } from 'primeng/dialog';



@NgModule({
  declarations: [
    TodoListComponent,
    TaskListComponent,
    TaskItemComponent
  ],
  imports: [
    CommonModule,
    CardModule,
    NzSpinModule,
    InputTextModule,
    ButtonModule,
    FormsModule,
    ToastModule,
    MessageModule,
    MessagesModule,
    CheckboxModule,
    DialogModule,
    ConfirmDialogModule
  ],
  providers: [MessageService]
})
export class TodoListModule { }
