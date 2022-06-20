import { Router } from '@angular/router';
import { RegisterService } from './../shared/services/register.service';
import { Component, OnInit } from '@angular/core';
import { RegisterRequest } from '../shared/models/register.model';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
  providers:[MessageService]

})
export class RegisterComponent implements OnInit {

  /**
   * Các điều kiện mật khẩu đăng ký
   */
  readonly PASSWORD_TOO_SHORT = 'PasswordTooShort';
  readonly REQUIRES_NON_ALPHANUMERIC = 'PasswordRequiresNonAlphanumeric';
  readonly REQUIRES_DIGIT = 'PasswordRequiresDigit';
  readonly REQUIRE_SUPPER = 'PasswordRequiresUpper';
  readonly DUPLICATE_USERNAME = 'DuplicateUserName';


  isSpinning = false;

  /**
   * Thông báo lỗi
   */
  usernameError: string[];
  passwordError: string[];
  rePassError: string[];


  modelRegister: RegisterRequest;
  btnDisabled: boolean;
  showErrorBorder: boolean;

  constructor(
    private registerService: RegisterService,
    private router: Router,
    private messageService: MessageService) {

    this.modelRegister = {
      username: '',
      password: '',
      confirmPassword: ''
    }
    this.btnDisabled = false;
    this.usernameError = [];
    this.passwordError = [];
    this.rePassError = [];
    this.showErrorBorder = false;
  }

  ngOnInit(): void {
  }

  register(){
    this.sendRequestToServer(this.modelRegister);
  }

  sendRequestToServer(form: any){
    this.btnDisabled = true;
    this.isSpinning = true;
    this.clearErrors();
    this.registerService.register(form).subscribe(
      (res: any)=>{
        if(res?.succeeded){
          this.messageService.add({severity:'success', summary:'Đăng ký thành công!', detail:'Bạn đã đăng ký thành công tài khoản và mật khẩu'});
          setTimeout(()=>{
            this.btnDisabled = false;
            this.isSpinning = false;
            this.router.navigateByUrl('/login');
          }, 1000);
        }else{
          this.btnDisabled = false;
          this.isSpinning = false;
          this.showErrors(res?.errors);
        }

      },
      (error)=>{
          if(error?.status == 400){
            this.handelError400(error?.error?.errors);
          }
          this.btnDisabled = false;
          this.isSpinning = false;
      }
    );
  }

  /**
   * Xử lý các Error từ Server
   *
   */

  handelError400(error: any){
    if(error?.Username){
      this.usernameError.push("Bạn chưa nhập tài khoản!");
    }
    if(error?.Password){
      this.passwordError.push("Bạn chưa nhập mật khẩu!");
    }
    if(error?.ConfirmPassword){
      this.rePassError.push("Xác nhận mật khẩu không khớp!");
    }
  }

  showErrors(errors: any[]){
    this.clearErrors();
    errors.forEach((error)=>{
      switch(error?.code){
        case this.PASSWORD_TOO_SHORT:{
          this.passwordError.push("Mật khẩu phải có ít nhất 8 ký tự.");
          break;
        }
        case this.REQUIRES_NON_ALPHANUMERIC:{
          this.passwordError.push("Mật khẩu phải chứa ít nhất một ký tự đặc biệt.");
          break;
        }
        case this.REQUIRES_DIGIT: {
          this.passwordError.push("Mật khẩu phải có ít nhất một chữ số ('0' - '9').");
          break;
        }
        case this.REQUIRE_SUPPER: {
          this.passwordError.push("Mật khẩu phải có ít nhất một chữ hoa ('A' - 'Z').");
          break;
        }
        case this.DUPLICATE_USERNAME: {
          this.usernameError.push("Tài khoản đã tồn tại.")
        }
      }
    })
  }

  clearErrors(){
    this.passwordError = [];
    this.usernameError = [];
    this.rePassError = [];
  }


}
