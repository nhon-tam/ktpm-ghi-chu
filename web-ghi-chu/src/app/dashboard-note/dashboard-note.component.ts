import { CommonService } from '../shared/services/common.service';
import { UserProfileService } from './../shared/services/user-profile.service';
import { Router } from '@angular/router';
import { MenuItem } from 'primeng/api';
import { Component, ElementRef, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-dashboard-note',
  templateUrl: './dashboard-note.component.html',
  styleUrls: ['./dashboard-note.component.css'],
})
export class DashboardNoteComponent implements OnInit {
  @ViewChild("imageUploader", {read: ElementRef}) imageUploader: any;

  isCollapsed = false;
  menuItems: MenuItem[];
  userProfile: any;
  displayModal: boolean;
  uploadedFiles: any[] = [];
  imageSrc: any;
  searchFilter: string;
  listLayout: boolean;
  Url = environment.apiUrl + '//Images//';
  @Output() loadDataEmit: EventEmitter<any>;

  constructor(private router: Router,
              private userProfileService: UserProfileService,
              private commonService : CommonService) {
    this.menuItems = [];
    this.displayModal = false;
    this.searchFilter = '';
    this.listLayout = false;
    this.loadDataEmit = new EventEmitter();
  }

  ngOnInit(): void {
    this.loadUserProfile();
    this.commonService.listLayout$.subscribe((active: any)=>{
      this.listLayout = active;
    })
    this.LoadUserAvatar();
  }

  loadUserProfile(){
    this.getUserProfileFromServer().subscribe((res: any)=>{
      this.userProfile = res;
    })
  }

  getUserProfileFromServer(){
    return this.userProfileService.getUserProfile();
  }

  onHideModal(){
    this.displayModal = false;
  }


  /**
   * Chưa hoàn thiện, cập nhật sau
   */
  showUploadAvatarModal(){
    this.displayModal = true;
  }




  onSelect(event:any) {
    const file = event.files[0];

    const reader = new FileReader();
    reader.onload = e => this.imageSrc = reader.result;

    reader.readAsDataURL(file);
  }

  filter(event: any){
    this.commonService.addSearch(this.searchFilter);
  }

  reloadData(event:any){
    this.commonService.activeReload(true);
  }
  uploadAvatar(event: any){

  }

  changeLayout(event: any){
    this.commonService.activeListLayout(!this.listLayout);
  }

  signOut(){
    localStorage.removeItem('token');
    this.router.navigateByUrl('/login');
  }

  getAvatar(){
    return this.userProfileService.getAvatar()
  }

  LoadUserAvatar(){
    this.getAvatar().subscribe((item:any)=>{
      this.Url = this.Url + item
    });
    this.Url = environment.apiUrl + '//Images//';
    this.uploadedFiles = [];
  }


}
