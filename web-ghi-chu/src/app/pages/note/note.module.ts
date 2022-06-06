import { AvatarGroupModule } from 'primeng/avatargroup';
import { AvatarModule } from 'primeng/avatar';
import { ScrollPanelModule } from 'primeng/scrollpanel';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { InputTextModule } from 'primeng/inputtext';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NoteRoutingModule } from './note-routing.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NoteComponent } from './note.component';
import { NoteListComponent } from './note-list/note-list.component';
import { NoteItemComponent } from './note-item/note-item.component';
import { NzIconModule } from 'ng-zorro-antd/icon';
import {RippleModule} from 'primeng/ripple';
import { NzButtonModule } from 'ng-zorro-antd/button';
import {ButtonModule} from 'primeng/button';
import {DialogModule} from 'primeng/dialog';
import {CardModule} from 'primeng/card';
import { NzSpinModule } from 'ng-zorro-antd/spin';
import { MessageModule } from 'primeng/message';
import { MessagesModule } from 'primeng/messages';
import { ToastModule } from 'primeng/toast';
import { EditNoteBarComponent } from './edit-note-bar/edit-note-bar.component';
import { CollaboratorComponent } from './note-item/collaborator/collaborator.component';
import { EditNoteModalComponent } from './note-item/edit-note-modal/edit-note-modal.component';
import {AutoCompleteModule} from 'primeng/autocomplete';
import {RadioButtonModule} from 'primeng/radiobutton';

@NgModule({
  declarations: [
    NoteComponent,
    NoteListComponent,
    NoteItemComponent,
    EditNoteBarComponent,
    CollaboratorComponent,
    EditNoteModalComponent,
  ],
  imports: [
    CommonModule,
    NoteRoutingModule,
    NzIconModule,
    InputTextModule,
    RippleModule,
    NzButtonModule,
    ButtonModule,
    DialogModule,
    CardModule,
    InputTextareaModule,
    FormsModule,
    NzSpinModule,
    ScrollPanelModule,
    ToastModule,
    MessagesModule,
    MessageModule,
    AvatarModule,
    AvatarGroupModule,
    AutoCompleteModule,
    RadioButtonModule,
    ReactiveFormsModule
  ],
  exports: [
    NoteComponent,
    // NoteListComponent,
    // NoteItemComponent
  ]
})
export class NoteModule { }
