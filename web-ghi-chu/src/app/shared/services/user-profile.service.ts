import { debounceTime } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UserProfileService {

  private _sharedHeaders = new HttpHeaders();
  constructor(
    private http: HttpClient,
    private router: Router) {
      this._sharedHeaders = this._sharedHeaders.set('Content-Type', 'application/json');
  }

  getUserProfile(){
    return this.http.get(`${environment.apiUrl}/api/UserProfile`, {headers: this._sharedHeaders});
  }

  uploadAvatar(file: FormData){
    return this.http
    .post(`${environment.apiUrl}/api/UserProfile/UploadAvatar`,file,{
      responseType: 'json'
    }).pipe(debounceTime(1000));
  }

  editUserProfile(user: any){
    return this.http.post(`${environment.apiUrl}/api/UserProfile/editProfile`,user, {headers: this._sharedHeaders});
  }

  getAvatar(){
    return this.http.get(`${environment.apiUrl}/api/UserProfile/getAvatar`, {headers: this._sharedHeaders});
  }

  getOwnerAvatar(noteId: string){
    return this.http.get(`${environment.apiUrl}/api/UserProfile/GetOwner?NoteId=${noteId}`, {headers: this._sharedHeaders});
  }

  getUserAvatar(noteId: string){
    return this.http.get(`${environment.apiUrl}/api/UserProfile/GetUser?NoteId=${noteId}`, {headers: this._sharedHeaders});
  }
}
