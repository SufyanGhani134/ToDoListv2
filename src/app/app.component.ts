import { Component } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { TasksArray } from './tasks-array';
import { Task } from './task';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'ToDoList';

  ActiveTasks: TasksArray[] = [];
  completedTasksArray: TasksArray[] = [];
  SelectedIndex: number = 0;


  AddNewTask(TaskForm: FormGroup) {
    const newTask: Task = {
      display: false,
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

    console.log(this.ActiveTasks, "ActiveTask")
  }

  getIndex(index: number){
    this.SelectedIndex = index;
    console.log(this.SelectedIndex, "index------");
  }


  completedTask(task: Task){
    // console.log(this.ActiveTasks, "ActiveTask")
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

    // console.log(this.completedTasksArray, "Completed Task Array")
    this.RemoveTask(task);

  }

  RemoveTask(task: Task){
    for (let i = 0; i < this.ActiveTasks.length; i++) {
      if(task.date == this.ActiveTasks[i].date){
        this.ActiveTasks[i].children?.splice(this.SelectedIndex,1)
        console.log(this.ActiveTasks[i].children, "rempved")
        break
      }
    }
    // this.ActiveTasks.forEach(element => {
    //   if(task.date == element.date){
    //     this.ActiveTasks.splice(this.Index, 1);
        
    //   }
    // });
  }
}
