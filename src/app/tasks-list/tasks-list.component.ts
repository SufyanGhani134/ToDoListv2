import {
  Component,
  DoCheck,
  EventEmitter,
  Input,
  Output,
} from '@angular/core';
import { Task } from '../task';

@Component({
  selector: 'app-tasks-list',
  templateUrl: './tasks-list.component.html',
  styleUrls: ['./tasks-list.component.css'],
})
export class TasksListComponent implements DoCheck {
  inputDisplay: boolean = false;
  editBtnDisplay: boolean = false;
  title: string="";
  detail: string="";


  updateTitle(event: any){
    this.title = event.target.value;
  }

  updateDetail(event: any){
    this.detail = event.target.value;
  }

  @Input()
  tasksArray?: any[];

  @Output()
  completedTask: EventEmitter<Task> = new EventEmitter<Task>();

  @Output()
  indexEmitter: EventEmitter<number> = new EventEmitter<number>();

  @Output()
  updatedTaskEmitter: EventEmitter<Task>=new EventEmitter<Task>();

  CheckedTask(task: Task, index: number) {
    this.indexEmitter.emit(index);
    task.status = !task.status;
    this.completedTask.emit(task);
  }


  updateTask(task: Task, index: number){
    const updatedTask : Task = {
      display: task.display,
      title: this.title,
      detail: this.detail,
      date: task.date,
      status: task.status
    }
    console.log(updatedTask)
    this.indexEmitter.emit(index)
    this.updatedTaskEmitter.emit(updatedTask);
    this.inputDisplay = false;
    this.editBtnDisplay = false;
  }

  ngDoCheck(): void {
    this.tasksArray?.forEach((element, i: number) => {
      if (element.children.length == 0) {
        this.tasksArray?.splice(i, 1);
      }
    });
  }
}
