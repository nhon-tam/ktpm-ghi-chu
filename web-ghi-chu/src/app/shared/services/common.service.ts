import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Subject } from 'rxjs/internal/Subject';

@Injectable({
  providedIn: 'root'
})
export class CommonService {

  private search = new BehaviorSubject<string>('');
  private listLayout = new BehaviorSubject<boolean>(false);
  private reload = new BehaviorSubject<boolean>(false);

  get search$(){
    return this.search.asObservable();
  }

  get listLayout$(){
    return this.listLayout.asObservable();
  }

  get reload$(){
    return this.reload.asObservable();
  }

  addSearch(data:string) {
    this.search.next(data);
  }

  activeListLayout(active: boolean){
    this.listLayout.next(active);
  }
  activeReload(active: boolean){
    this.reload.next(active)
  }

}
