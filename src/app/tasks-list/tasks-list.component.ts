import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Task } from '../task';

@Component({
  selector: 'app-tasks-list',
  templateUrl: './tasks-list.component.html',
  styleUrls: ['./tasks-list.component.css']
})
export class TasksListComponent {

  @Input()
  tasksArray?: any[];

  @Output()
  completedTask: EventEmitter<Task> = new EventEmitter<Task>;

  @Output()
  indexEmitter: EventEmitter<number>=new EventEmitter<number>

  CheckedTask(task: Task, index: number){
    console.log(index, "index======");
    this.indexEmitter.emit(index);
    this.completedTask.emit(task);
  }
  // [
  //    {
  //   display: false,
  //   date: new Date(),
  //   children: [
  //     {
  //       display: false,
  //       title: 'Title1',
  //       detail: 'Details1',
  //       date: new Date(),
  //       status: false,
  //     },
  //     {
  //       display: false,
  //       title: 'Title2',
  //       detail: 'Details2',
  //       date: new Date(),
  //       status: false,
  //     }
  //   ],
  // },
  // {
  //   display: false,
  //   date: new Date(),
  //   children: [
  //     {
  //       display: false,
  //       title: 'Title3',
  //       detail: 'Details3',
  //       date: new Date(),
  //       status: false,
  //     },
  //   ],
  // },];
}
