import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login.component';
import { LoginRoutingModule } from './login-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzSpinModule } from 'ng-zorro-antd/spin';
import { BrowserModule } from '@angular/platform-browser';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthInterceptor } from '../auth/auth.interceptor';



@NgModule({
  declarations: [
    LoginComponent,
  ],
  imports: [
    LoginRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    NzIconModule,
    NzSpinModule
  ]
  ,
  exports: [LoginComponent]
  ,
  providers: [
    {
    provide: [HTTP_INTERCEPTORS],
    multi: true,
    useClass: AuthInterceptor }],
})
export class LoginModule { }
