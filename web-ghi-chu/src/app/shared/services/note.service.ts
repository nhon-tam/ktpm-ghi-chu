import { NoteRequest } from './../models/note-request.model';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';

export interface CollabRequest{
  success: boolean;
  listUsers: any[]
}

@Injectable({
  providedIn: 'root'
})
export class NoteService {

  private _sharedHeaders = new HttpHeaders();
  constructor(
    private http: HttpClient,
    private router: Router) {
      this._sharedHeaders = this._sharedHeaders.set('Content-Type', 'application/json');
  }

  createNote(noteRequest: NoteRequest){
    return this.http.post(`${environment.apiUrl}/api/Note/Create`, noteRequest, {headers: this._sharedHeaders});
  }

  getAllNote(){
    return this.http.get(`${environment.apiUrl}/api/Note/GetAll`, {headers: this._sharedHeaders});
  }

  deleteNote(noteId: string){
    return this.http.delete(`${environment.apiUrl}/api/Note/Delete?NoteId=${noteId}`, {headers: this._sharedHeaders});
  }

  detailNote(noteId: string){
    return this.http.get(`${environment.apiUrl}/api/Note/Detail?NoteId=${noteId}`, {headers: this._sharedHeaders});
  }

  updateNote(noteRequest: NoteRequest){
    return this.http.put(`${environment.apiUrl}/api/Note/Update`, noteRequest, {headers: this._sharedHeaders});
  }

  createCollabUsers(noteId: string, users: any[]){
    return this.http.post(`${environment.apiUrl}/api/Note/CreateCollabUsers?NoteId=${noteId}`,users, {headers: this._sharedHeaders});

  }

  getCollabUsers(noteId: string){
    return this.http.get<CollabRequest>(`${environment.apiUrl}/api/Note/GetCollabUsers?NoteId=${noteId}`, {headers: this._sharedHeaders});

  }

  getOwner(noteId: string){
    return this.http.get(`${environment.apiUrl}/api/Note/GetOwner?NoteId=${noteId}`, {headers: this._sharedHeaders});
  }

  search(filter: string){
    return this.http.get(`${environment.apiUrl}/api/Note/Search?Filter=${filter}`, {headers: this._sharedHeaders});
  }

  changeColor(changeColorVM: any){

    return this.http.post(`${environment.apiUrl}/api/Note/ChangeColor`,changeColorVM,{headers: this._sharedHeaders});
  }

  clone(clone: any){
    return this.http.put(`${environment.apiUrl}/api/Note/Clone`,clone,{headers: this._sharedHeaders});

  }

}
