import { ConfirmationService } from 'primeng/api';
import { TodoService } from './../../../shared/services/todo.service';
import { Component, Input, OnInit, Output, EventEmitter, OnChanges } from '@angular/core';
import { TodoRequest } from 'src/app/shared/models/todo-request.model';

@Component({
  selector: 'app-task-item',
  templateUrl: './task-item.component.html',
  styleUrls: ['./task-item.component.css']
})
export class TaskItemComponent implements OnInit {
  @Input() task: any;
  @Output() loadDataEvent: EventEmitter<any>;

  todoRequest: TodoRequest = <TodoRequest>{};
  checked: boolean;
  displayModal: boolean;
  taskInput: string;

  constructor(
    private todoService: TodoService,
    private confirmationService: ConfirmationService
  ) {
    this.loadDataEvent = new EventEmitter();
    this.checked = false;
    this.displayModal = false;
    this.taskInput = '';
   }

  ngOnInit(): void {
    this.checked = this.task?.status;
    this.todoRequest = new TodoRequest(this.task.todoId, this.task.task, this.task.status);
  }

  deleteTask(event: any){
    this.confirmationService.confirm({
      message: 'Bạn có muốn xóa công việc này không không?',
      header: 'Xác nhận',
      icon: 'pi pi-exclamation-triangle',
      acceptLabel:'Đồng ý',
      rejectLabel: 'Hủy',
      accept: () => {
        this.todoService.deleteTodo(this.task?.todoId).subscribe((res)=>{
          this.loadDataEvent.emit();
          this.confirmationService.close();
        });
      },
      reject: () => {
        this.confirmationService.close();
      }
    });

  }

  onChangeStatus(event: any){
    this.todoService.updateTodo(this.todoRequest).subscribe((res)=>{
      this.loadDataEvent.emit();
    })

  }

  showUpdateModal(){
    this.todoService.loadDetail(this.task.todoId).subscribe((res: any) => {
      this.task = res;
      this.taskInput = res?.task;
      this.displayModal = true;
    })
  }

  updateTask(event: any){
    this.todoRequest.task = this.taskInput;
    this.todoService.updateTodo(this.todoRequest).subscribe((res)=>{
      this.loadDataEvent.emit();
    })
  }

  handleClose(event: any){
    this.taskInput = '';
    this.loadDataEvent.emit();
  }

}
