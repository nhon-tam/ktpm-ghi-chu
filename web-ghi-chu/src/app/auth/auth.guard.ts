import { DeleteNoteService } from './../shared/services/delete-note.service';
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private router: Router, private deleteNoteService: DeleteNoteService){}


  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): boolean {
      if(this.isTokenExpired()){
        localStorage.removeItem('token');
        this.router.navigateByUrl('/login');
        return false
      }else{
        this.deleteNoteService.deleteEndTime().subscribe(()=>{
          return true;
        });
      }

      return true;
  }


  isTokenExpired() {
    const token = localStorage.getItem('token');
    const helper = new JwtHelperService();
    return token && helper.isTokenExpired(token);
  }

}
