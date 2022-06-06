import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  private _sharedHeaders = new HttpHeaders();
  constructor(
    private http: HttpClient,
    private router: Router) {
      this._sharedHeaders = this._sharedHeaders.set('Content-Type', 'application/json');
  }

  getAll(){
    return this.http.get(`${environment.apiUrl}/api/Notification/GetAll`, {headers: this._sharedHeaders});
  }

  getNotify(){
    return this.http.get(`${environment.apiUrl}/api/Notification/GetNotify`, {headers: this._sharedHeaders});
  }
}
