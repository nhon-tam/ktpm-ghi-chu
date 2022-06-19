import { MessageService } from 'primeng/api';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginRequest } from '../shared/models/login.model';
import { LoginService } from '../shared/services/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  modelLogin: LoginRequest;
  isSpinning = false;
  errorMessage = "";
  constructor(
    private loginService: LoginService,
    private router: Router,
    private messageService: MessageService
  ) {
    this.modelLogin = {
      username: '',
      password: '',
    }
  }

  ngOnInit(): void {
  }

  login(){
    this.isSpinning = true;
    this.loginService.login(this.modelLogin).subscribe(
      (res: any)=>{
        localStorage.setItem('token', res?.token);
        this.isSpinning = false;
        this.messageService.add({severity:'success', summary:'Đăng nhập thành công!', detail:'Bạn đã đăng nhập thành công tài khoản và mật khẩu'});
        setTimeout(()=>{
          this.router.navigateByUrl('/dashboard');
        }, 1000);
      },
      (error)=>{
        if(error.status == 400){
          this.errorMessage = "Tài khoản hoặc mật khẩu không đúng!";
          this.isSpinning = false;

        }
      }
      )
  }


}
