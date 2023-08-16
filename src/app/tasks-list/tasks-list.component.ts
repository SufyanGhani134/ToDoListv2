import {
  Component,
  DoCheck,
  ElementRef,
  EventEmitter,
  Input,
  Output,
  ViewChild,
} from '@angular/core';
import { Task } from '../task';

@Component({
  selector: 'app-tasks-list',
  templateUrl: './tasks-list.component.html',
  styleUrls: ['./tasks-list.component.css'],
})
export class TasksListComponent implements DoCheck {
  title: string = '';
  detail: any;

  @ViewChild('updatedTitle')
  updatedTitle!: ElementRef;

  @ViewChild('updatedDetail')
  updatedDetail!: ElementRef;

  @Input()
  tasksArray?: any[];

  @Output()
  completedTask: EventEmitter<Task> = new EventEmitter<Task>();

  @Output()
  indexEmitter: EventEmitter<number> = new EventEmitter<number>();

  @Output()
  updatedTaskEmitter: EventEmitter<Task> = new EventEmitter<Task>();

  CheckedTask(task: Task, index: number) {
    this.indexEmitter.emit(index);
    task.status = !task.status;
    this.completedTask.emit(task);
  }

  updateTask(task: Task, index: number) {
    const updatedTask: Task = {
      display: task.display,
      inputDisplay: task.inputDisplay,
      editBtnDisplay: task.editBtnDisplay,
      title: this.updatedTitle.nativeElement.value,
      detail: this.updatedDetail.nativeElement.value,
      date: task.date,
      status: task.status,
    };
    this.indexEmitter.emit(index);
    this.updatedTaskEmitter.emit(updatedTask);
  }

  ngDoCheck(): void {
    this.tasksArray?.forEach((element, i: number) => {
      if (element.children.length == 0) {
        this.tasksArray?.splice(i, 1);
      }
    });
  }
}
