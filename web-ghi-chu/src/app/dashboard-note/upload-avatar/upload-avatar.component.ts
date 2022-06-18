import { Route, Router } from '@angular/router';

import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { NzUploadFile } from 'ng-zorro-antd/upload';
import { UserProfileService } from 'src/app/shared/services/user-profile.service';
import { environment } from 'src/environments/environment';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-upload-avatar',
  templateUrl: './upload-avatar.component.html',
  styleUrls: ['./upload-avatar.component.css'],
  providers: [MessageService]
})
export class UploadAvatarComponent implements OnInit {

  isSpinning: boolean;
  @Input() Url: any
  @Output() loadDataEmit: EventEmitter<any>;
  datafile: File[] = [];
  constructor(
    private userprofileService: UserProfileService,
    private messageService: MessageService,
    private router: Router)
  {
    this.isSpinning = false;
    this.loadDataEmit = new EventEmitter();
  }

  UpdloadAvatar(){
    let formData = new FormData();
    formData.append('file', this.datafile[0], this.datafile[0].name);
    this.userprofileService.uploadAvatar(formData).subscribe((item: any)=>{
      setTimeout(() => {
        this.loadDataEmit.emit();
        this.isSpinning = false;
        this.datafile = []
      }, 1000);
    })


  }

  loadAvatar(){
    this.loadDataEmit.emit();
  }

  onSelect(event: any) {
    for(let file of event.files) {
        this.datafile.push(file);
    }
  }

  ngOnInit(){
  }


}
