import { CommonService } from '../shared/services/common.service';
import { ToastModule } from 'primeng/toast';
import { NotificationComponent } from './../pages/notification/notification.component';
import { NotificationModule } from './../pages/notification/notification.module';
import { TranslateModule } from '@ngx-translate/core';
import { NoteModule } from './../pages/note/note.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardNoteComponent } from './dashboard-note.component';
import { AppRoutingModule } from '../app-routing.module';
import { DashboardRoutingModule } from './dashboard-routing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { IconsProviderModule } from '../icons-provider.module';
import { NzLayoutModule } from 'ng-zorro-antd/layout';
import { NzMenuModule } from 'ng-zorro-antd/menu';
import {AvatarModule} from 'primeng/avatar';
import {AvatarGroupModule} from 'primeng/avatargroup';
import { NzDropDownModule } from 'ng-zorro-antd/dropdown';
import {ScrollPanelModule} from 'primeng/scrollpanel';
import {ScrollTopModule} from 'primeng/scrolltop';
import {BadgeModule} from 'primeng/badge';
import { Dialog, DialogModule } from 'primeng/dialog';
import {FileUploadModule} from 'primeng/fileupload';
import { UploadAvatarComponent } from './upload-avatar/upload-avatar.component';
import { NzUploadModule } from 'ng-zorro-antd/upload';
import { NotifyComponent } from './notify/notify.component';
import { InputTextModule } from 'primeng/inputtext';

@NgModule({
  declarations: [
    DashboardNoteComponent,
    UploadAvatarComponent,
    NotifyComponent,
  ],
  imports: [
    DashboardRoutingModule,
    FormsModule,
    CommonModule,
    IconsProviderModule,
    NzLayoutModule,
    NzMenuModule,
    NoteModule,
    AvatarModule,
    AvatarGroupModule,
    NzDropDownModule,
    ScrollPanelModule,
    ScrollTopModule,
    BadgeModule,
    DialogModule,
    FileUploadModule,
    NzUploadModule,
    ToastModule,
    InputTextModule
  ],
  exports: [
    DashboardNoteComponent,
  ],

})
export class DashboardNoteModule { }
