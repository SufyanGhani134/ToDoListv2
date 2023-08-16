import { Component, DoCheck } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { TasksArray } from './tasks-array';
import { Task } from './task';
import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'ToDoList';

  ActiveTasks: TasksArray[] = [];
  completedTasksArray: TasksArray[] = [];
  SelectedIndex: number = 0;

  AddNewTask(TaskForm: FormGroup) {
    const newTask: Task = {
      display: false,
      inputDisplay: false,
      editBtnDisplay: false,
      title: '',
      detail: '',
      date: new Date(),
      status: false,
    };
    newTask.title = TaskForm.controls['title'].value;
    newTask.detail = TaskForm.controls['detail'].value;
    newTask.date = TaskForm.controls['date'].value;
    const matchingTask = this.ActiveTasks.find(
      (element) => element.date === newTask.date
    );

    if (matchingTask) {
      matchingTask.children?.push(newTask);
    } else {
      const newTaskArrayObj: TasksArray = {
        display: false,
        date: newTask.date,
        children: [newTask],
      };
      this.ActiveTasks.push(newTaskArrayObj);
    }
    debugger;
    setTimeout(() => {
      this.completedTask(newTask)
    }, TaskForm.controls['time'].value);
  }

  getIndex(index: number) {
    this.SelectedIndex = index;
  }

  completedTask(task: Task) {
    const matchingTask = this.completedTasksArray.find(
      (element) => element.date === task.date
    );
    if (matchingTask) {
      matchingTask.children?.push(task);
    } else {
      const newTaskArrayObj: TasksArray = {
        display: false,
        date: task.date,
        children: [task],
      };
      this.completedTasksArray.push(newTaskArrayObj);
    }
    this.RemoveTask(task);
  }

  RemoveTask(task: Task) {
    console.log(this.SelectedIndex, 'index------');
    for (let i = 0; i < this.ActiveTasks.length; i++) {
      if (task.date == this.ActiveTasks[i].date) {
        this.ActiveTasks[i].children?.splice(this.SelectedIndex, 1);
        console.log(this.ActiveTasks[i].children, 'rempved');
        break;
      }
    }
  }

  updateTask(task: Task) {
    for (let i = 0; i < this.ActiveTasks.length; i++) {
      if (task.date == this.ActiveTasks[i].date) {
        this.ActiveTasks[i].children?.forEach((element, index) => {
          if (this.SelectedIndex == index) {
            element.title = task.title;
            element.detail = task.detail;
          }
        });
      }
    }
  }

  dropTasksArray(event: any){
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex,
      );
    }
  }
}
