import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { debounceTime } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  private _sharedHeaders = new HttpHeaders();
  constructor(
    private http: HttpClient,
    private router: Router) {
      this._sharedHeaders = this._sharedHeaders.set('Content-Type', 'application/json');
  }

  isContaintUser(name?: string){
    return this.http.get(`${environment.apiUrl}/api/Account/Contain?Name=${name}`, {headers: this._sharedHeaders});
  }
  getUsersByName(name?: string){
    return this.http.get(`${environment.apiUrl}/api/Account/GetUsersByName?Name=${name}`, {headers: this._sharedHeaders});
  }

  uploadAvatar(file: FormData){
    return this.http
    .post(`${environment.apiUrl}/api/UserProfile/UploadAvatar`,file,{
      responseType: 'json'
    }).pipe(debounceTime(1000));
  }
}
