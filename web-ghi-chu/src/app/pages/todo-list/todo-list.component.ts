import { debounceTime } from 'rxjs';
import { CommonService } from './../../shared/services/common.service';
import { MessageService } from 'primeng/api';
import { TodoService } from './../../shared/services/todo.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.css']
})
export class TodoListComponent implements OnInit {
  isSpinning: boolean = false;
  listTask: any[];
  taskInput: string;
  filter: string;

  constructor(
    private todoService: TodoService,
    private messageService: MessageService,
    private commonService: CommonService,
  ) {
    this.listTask = [];
    this.taskInput = ''
    this.filter = ''
   }

  ngOnInit(): void {
    this.searchTodo();
    this.commonService.search$.pipe(debounceTime(1000)).subscribe((f)=>{
      this.filter = f;
      this.searchTodo();
    })
    this.commonService.reload$.subscribe((active)=>{
      if(active){
        this.searchTodo();
        this.commonService.activeReload(false);
      }
    })
  }

  loadTodoData(){
    this.isSpinning = true;

    this.todoService.getTodoList().subscribe((item: any[])=>{
      setTimeout(()=>{
        this.listTask = item;
        this.isSpinning = false;
      },1000)

    })

  }

  searchTodo(){
    this.isSpinning = true;

    this.todoService.search(this.filter).subscribe((items : any)=>{
        this.listTask = items;
        this.isSpinning = false;
    })
  }

  saveTask(event: any){
    this.todoService.saveTodo(this.taskInput).subscribe((res)=>{
      this.messageService.add({severity:'success', summary:'Tạo thành công!', detail:'Tạo thành công công việc!'});
      this.taskInput = '';
      this.searchTodo();
    },
    (error)=>{

    }

    )
  }

}
