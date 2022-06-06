import { Router } from '@angular/router';
import { HttpClient, HttpEvent, HttpHandler, HttpHeaders, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

    private _sharedHeaders = new HttpHeaders();
    constructor(
      private http: HttpClient,
      private router: Router) {
        this._sharedHeaders = this._sharedHeaders.set('Content-Type', 'application/json');
    }


    login(formData: any){
      return this.http.post(`${environment.apiUrl}/api/Account/login`, formData);
    }

    logout(){
      localStorage.removeItem('token');
      this.router.navigateByUrl('/login');
    }


}
