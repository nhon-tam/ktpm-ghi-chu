import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.css']
})
export class TaskListComponent implements OnInit {
  @Input() listTask: any[];
  @Output() loadDataEvent: EventEmitter<any>;
  constructor() {
    this.listTask = [];
    this.loadDataEvent = new EventEmitter();
  }

  ngOnInit(): void {
  }

  loadData(event: any){
    this.loadDataEvent.emit();
  }

}
