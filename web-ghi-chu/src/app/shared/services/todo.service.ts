import { TodoRequest } from './../models/todo-request.model';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class TodoService {

  private _sharedHeaders = new HttpHeaders();
  constructor(
    private http: HttpClient,
    private router: Router) {
      this._sharedHeaders = this._sharedHeaders.set('Content-Type', 'application/json');
  }

  getTodoList(){
    return this.http.get<any[]>(`${environment.apiUrl}/api/Todo/GetAll`, {headers: this._sharedHeaders})
  }

  saveTodo(task: string){
    return this.http.post(`${environment.apiUrl}/api/Todo/SaveTodo?Task=${task}`, {headers: this._sharedHeaders})
  }

  deleteTodo(todoId: string){
    return this.http.delete(`${environment.apiUrl}/api/Todo/DeleteTodo?TodoId=${todoId}`, {headers: this._sharedHeaders})
  }

  updateTodo(todo: TodoRequest){
    return this.http.put(`${environment.apiUrl}/api/Todo/UpdateTodo`,todo, {headers: this._sharedHeaders})
  }

  loadDetail(todoId: string){
    return this.http.get(`${environment.apiUrl}/api/Todo/Detail?TodoId=${todoId}`, {headers: this._sharedHeaders})
  }
  search(filter:string){
    return this.http.get(`${environment.apiUrl}/api/Todo/Search?Filter=${filter}`, {headers: this._sharedHeaders});

  }

}
