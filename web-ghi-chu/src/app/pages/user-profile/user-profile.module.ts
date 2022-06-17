import { NzButtonModule } from 'ng-zorro-antd/button';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserProfileComponent } from './user-profile.component';
import { DialogModule } from 'primeng/dialog';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzInputModule } from 'ng-zorro-antd/input';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NzTableModule } from 'ng-zorro-antd/table';
import { IconModule } from '@ant-design/icons-angular';
import {MultiSelectModule} from 'primeng/multiselect';
import { NzModalModule } from 'ng-zorro-antd/modal';
import { ToastModule } from 'primeng/toast';
import { NzSpinModule } from 'ng-zorro-antd/spin';
import { NzSelectModule } from 'ng-zorro-antd/select';
@NgModule({
  declarations: [
    UserProfileComponent
  ],
  imports: [
    CommonModule,
    NzTableModule,
    DialogModule,
    InputTextModule,
    IconModule,
    MultiSelectModule,
    ToastModule,
    NzSpinModule,
    ButtonModule,
    DialogModule,
    NzFormModule,
    NzInputModule,
    ReactiveFormsModule,
    NzSelectModule,
    NzButtonModule,
    NzModalModule,
    FormsModule,
  ]
})
export class UserProfileModule { }
