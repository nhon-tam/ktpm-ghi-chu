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

  uploadAvatar(formData: any){
    return this.http.post(`${environment.apiUrl}/api/Account/login`, formData, {headers: this._sharedHeaders, reportProgress: true, observe: 'events'});
  }

  editUserProfile(user: any){
    return this.http.post(`${environment.apiUrl}/api/UserProfile/editProfile`,user, {headers: this._sharedHeaders});
  }
}
