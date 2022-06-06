import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class RegisterService {

  private _sharedHeaders = new HttpHeaders();
    constructor(
      private http: HttpClient,
      private router: Router) {
        this._sharedHeaders = this._sharedHeaders.set('Content-Type', 'application/json');
    }


    register(formData: any){
      return this.http.post(`${environment.apiUrl}/api/Account/Register`, formData, {headers: this._sharedHeaders});
    }

}
