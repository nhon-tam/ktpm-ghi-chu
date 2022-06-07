import { CommonService } from './../../../shared/services/common.service';
import { UsersService } from './../../../shared/services/users.service';
import { UserProfileService } from './../../../shared/services/user-profile.service';
import { CollabRequest, NoteService } from './../../../shared/services/note.service';
import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { NoteRequest } from 'src/app/shared/models/note-request.model';
import { MessageService } from 'primeng/api';
import { PriorityRadio } from '../edit-note-bar/edit-note-bar.component';
// import { PriorityService } from 'src/app/shared/services/priority.service';

export interface UserCollab{
  user: any;
  icon: string;
  hasError: boolean;
}



@Component({
  selector: 'app-note-item',
  templateUrl: './note-item.component.html',
  styleUrls: ['./note-item.component.css']
})
export class NoteItemComponent implements OnInit {
  @Input() noteItem: any;
  @Output() changeData: EventEmitter<any>;

  /**
   * Chu so huu note
   */
  ownerInfor: any;

  /**
   * priority
   */
   selectedPriority: any;

   priorities: PriorityRadio[]


  /**
   * Collab
   */

  //icon

  readonly ICON_MINUS = 'fa fa-minus';
  readonly ICON_PLUS = 'fa fa-plus';


  //Priority
  readonly PRIORITY_LOW = 1;
  readonly PRIORITY_MEDIUM = 2;
  readonly PRIORITY_HIGH = 3;

  //data
  usersSelected: any[];
  userCollabList: UserCollab[];
  usernameResults: any[];

  //Style

  styleLayout: any;

  displayModal: boolean;
  collabModal: boolean;
  noteRequest: NoteRequest;
  isSpinning: boolean;
  emptyNote: boolean;

  styleItem: any;


  //Common
  listLayout: boolean;


  constructor(
    private noteService: NoteService,
    private userProfileService: UserProfileService,
    private usersService: UsersService,
    private messageService: MessageService,
    // private priorityService: PriorityService,
    private commonService: CommonService
    ) {
    this.changeData = new EventEmitter();
    this.displayModal = false;
    this.collabModal = false;
    this.isSpinning = false;
    this.noteRequest = new NoteRequest('','','', 1);
    this.emptyNote = false;
    this.usersSelected = [];
    this.usernameResults= [];
    this.userCollabList = [];
    this.priorities = [];
    this.selectedPriority = null;
    this.listLayout = false;
  }

  ngOnInit(): void {
    // this.initPriorities();
    this.commonService.listLayout$.subscribe((active)=>{
      this.listLayout = active;
      this.changeStyleNote();

    })
  }

  // initPriorities(){
  //   this.priorityService.getAllPriority().subscribe((data: any[])=>{
  //     this.priorities = data.map((item)=>({
  //       name: item?.name,
  //       key: item?.priorityId
  //     }))
  //     this.selectedPriority = this.priorities[0];
  //   });
  // }

  changeStyleNote(){
    if(this.listLayout){
      this.styleItem = {
        'width': '40rem'
        ,'height': '14rem'
        , 'margin-top': '20px'
        ,'overflow': 'auto'
        };
    }
    else{
      this.styleItem ={'width': '17rem'
          , 'margin': '0.3em'
          , 'margin-top': '1em'
          };
    }

  }



  removeNote(){
    this.isSpinning = true;
    this.deleteNote(this.noteItem?.noteId).subscribe((res)=>{
      this.messageService.add({severity:'success', summary: 'Thành công', detail: 'Ghi chú đã được bỏ vào thùng rác!'});
      this.isSpinning = false;
      this.changeData.emit();
    })
  }

  saveAndClose(event: any){
    // this.noteRequest.noteId = this.noteItem?.noteId;
    // this.updateNoteToServer(this.noteRequest).subscribe((res)=>{
    //   this.displayModal = false;
    // })

    this.noteRequest.noteId = this.noteItem?.noteId;
    this.noteRequest.priorityId = this.selectedPriority.key;
    this.updateNoteToServer(this.noteRequest).subscribe((res)=>{
      console.log(this.noteRequest);
      this.displayModal = false;
    })
  }

  showModal(){
    this.displayModal = true;
    this.getNoteDetail();
  }

  hideModal(){
    this.displayModal = false;
  }

  showCollabModal(){
    this.getOwnerUser();
    this.getCollabUsers();
    this.collabModal = true;
  }

  getOwnerUser(){
    this.isSpinning = true;

    this.getOwner(this.noteItem?.noteId).subscribe((res: any)=>{

      setTimeout(()=>{
        this.ownerInfor = res
        this.isSpinning = false;
      }, 1000)
    })
  }

  getCollabUsers(){
    this.userCollabList = []
    this.isSpinning = true;
    this.getCollabUsersFromServer(this.noteItem?.noteId).subscribe((res: CollabRequest)=>{
      setTimeout(()=>{
        if(res.success){
          res.listUsers.forEach((item)=>{
            this.userCollabList.push({
              hasError: false,
              icon: this.ICON_MINUS,
              user: item
            })
          });
        }
        if(this.noteItem?.user?.userName === this.ownerInfor?.userName){
          this.userCollabList.push({
            icon: this.ICON_PLUS,
            user: null,
            hasError: false,
          })
        }
      }, 1000);
    });
  }

  getNoteDetail(){
    this.isSpinning = true;

    this.getDetailFromServer(this.noteItem?.noteId).subscribe((res: any)=>{

      setTimeout(()=>{
        this.noteRequest.description = res?.description;
        this.noteRequest.title = res?.title;
        this.selectedPriority = this.priorities.find(f => f.key == res?.priorityId);
        this.isSpinning = false;
      }, 1000)
    })
  }

  /**
   * Collab
  */

  saveCollabList(event: any): boolean{
    let listUsers: any[] = [];
    var error = false;
    this.userCollabList.forEach((item: UserCollab)=>{
      if(item.hasError){
        error = true;
        this.messageService.add({severity:'error', summary:'Tài khoản không hợp lệ!', detail:'Tài khoản không hợp lệ hoặc không tồn tại!'});
      }
      else{
        if(item.user){
          listUsers.push(item.user);
        }
      }
    })
    if(error){
      return false;
    }
    this.CreateCollabUsersFromServer(this.noteItem?.noteId, listUsers).subscribe((res: any)=>{
      if(res?.success){
        this.userCollabList = [];
        this.onHideModal();
      }
    })

    return true;
  }

  cancelCollabList(event: any){
    this.userCollabList = [];
    this.onHideModal();
  }

  searchUser(event:any) {
    this.getUsers(event.query).subscribe((data: any)=>{
      this.usernameResults = data?.users;
    })
  }

  addOrRemoveUser(i: number){
    const userCollab: UserCollab = this.userCollabList[i];
    if(userCollab.icon === this.ICON_PLUS){
      this.isContainUser(userCollab.user?.userName).subscribe((res: any)=>{
        userCollab.hasError = false;
        if(res?.success){
          this.userCollabList.push({
            icon: this.ICON_PLUS,
            user: null,
            hasError: false,
          })
          userCollab.icon = this.ICON_MINUS
        }
      },
      (error)=>{
        userCollab.hasError = true;
      }
      )
    }
    else{
      this.userCollabList = this.userCollabList.filter(f => f != userCollab);
    }
  }

  onSelectUser(event: any){
  }

  onHideModal(){
    this.changeData.emit();
  }

  /**
   * API
   */

   deleteNote(noteId: string){
    return this.noteService.deleteNote(noteId);
  }

  getDetailFromServer(noteId: string){
    return this.noteService.detailNote(noteId);
  }

  updateNoteToServer(noteRequest: NoteRequest){
    return this.noteService.updateNote(noteRequest);
  }

  isEmpty(str: string) {
    return (!str || str.length === 0 );
  }

  isBlank(str: string){
    return (!str || /^\s*$/.test(str));
  }

  getUserInforFromServer(){
    return this.userProfileService.getUserProfile();
  }

  getOwner(noteId: string){
    return this.noteService.getOwner(noteId);
  }

  /**
   * Api collab
   */
  isContainUser(name?: string){
    return this.usersService.isContaintUser(name);
  }

  getUsers(name?: string){
    return this.usersService.getUsersByName(name);
  }

  CreateCollabUsersFromServer(noteId: string, users: any[]){
    return this.noteService.createCollabUsers(noteId, users);
  }

  getCollabUsersFromServer(noteId: string){
    return this.noteService.getCollabUsers(noteId);
  }


}
