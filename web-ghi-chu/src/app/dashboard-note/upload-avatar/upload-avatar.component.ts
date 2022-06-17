
import { Component, OnInit } from '@angular/core';
import { NzUploadFile } from 'ng-zorro-antd/upload';
import { UserProfileService } from 'src/app/shared/services/user-profile.service';

@Component({
  selector: 'app-upload-avatar',
  templateUrl: './upload-avatar.component.html',
  styleUrls: ['./upload-avatar.component.css']
})
export class UploadAvatarComponent implements OnInit {

  loading = false;
  avatarUrl?: any;
  datafile: File[] = [];

  constructor(private userprofileservice: UserProfileService) {
  }

  UpdloadAvatar(){
    let formData = new FormData();
    formData.append('file', this.avatarUrl[0], this.avatarUrl[0].name);
    this.userprofileservice.uploadAvatar(formData).subscribe((item: any)=>{})
  }

  onSelect(event: any) {
    for(let file of event.files) {
        this.datafile.push(file);
    }
  }

  ngOnInit(): void {
  }



}
