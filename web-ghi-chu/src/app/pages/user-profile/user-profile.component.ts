import { User } from 'src/app/shared/models/user.model';

import { UserProfileService } from './../../shared/services/user-profile.service';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css'],
  providers: [FormBuilder]
})
export class UserProfileComponent implements OnInit {

  validateForm!: FormGroup;
  @Input() user: User;
  @Output() loadDataEmit: EventEmitter<any>;
  constructor(
    private fb: FormBuilder,
    private userprofileService: UserProfileService,
    private router: Router,)
    {
      this.loadDataEmit = new EventEmitter();
      this.user = new User("","","","");
    }

  ngOnInit(){
    this.LoadUserInfo();
    this.validateForm = this.fb.group({
      email:[null],
      phoneNumber:[null],
    });
  }

  getUserProfile(){
    return this.userprofileService.getUserProfile();
  }

  LoadUserInfo(){
   this.getUserProfile().subscribe((item:any)=>{
      this.user = item;
    });
  }
  submitForm(){
    this.user.email = this.validateForm.get('email')?.value
    this.user.phoneNumber = this.validateForm.get('phoneNumber')?.value
    this.userprofileService.editUserProfile(this.user).subscribe((item:any)=>{
      this.router.navigate(["/dashboard/note"], {
        // skipLocationChange: true,
        // queryParams:{
        //   id: ''
        // }
      })
      console.log(this.user);

    });
  }




}
