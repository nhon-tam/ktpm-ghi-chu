import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
@Injectable({
  providedIn: 'root'
})
export class DeleteNoteService {

  private _sharedHeaders = new HttpHeaders();
  constructor(
    private http: HttpClient,
    private router: Router) {
      this._sharedHeaders = this._sharedHeaders.set('Content-Type', 'application/json');
  }

  getAllNoteDelete(){
    return this.http.get(`${environment.apiUrl}/api/RecycleBin/GetAllDelete`, {headers: this._sharedHeaders});
  }

  revertDeleteNote(noteId: string){
    return this.http.put(`${environment.apiUrl}/api/RecycleBin/RevertDeleteNote?NoteId=${noteId}`, {headers: this._sharedHeaders});
  }

  deleteNote(noteId: string){
    return this.http.delete(`${environment.apiUrl}/api/RecycleBin/DeleteNote?NoteId=${noteId}`, {headers: this._sharedHeaders});
  }

  deleteEndTime(){
    return this.http.delete(`${environment.apiUrl}/api/RecycleBin/DeleteEndTime`, {headers: this._sharedHeaders});
  }

  deleteAll(){
    return this.http.delete(`${environment.apiUrl}/api/RecycleBin/DeleteAll`, {headers: this._sharedHeaders});
  }

  search(filter: string){
    return this.http.get(`${environment.apiUrl}/api/RecycleBin/Search?Filter=${filter}`, {headers: this._sharedHeaders});
  }

}
