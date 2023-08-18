import { Component, DoCheck } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { TasksArray } from './tasks-array';
import { Task } from './task';
import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { ToastrService } from 'ngx-toastr';
import { ApiServicesService } from './Services/api-services.service';
import { elementAt } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  constructor(private toastr: ToastrService, private apiServices: ApiServicesService) {}
  

  title = 'ToDoList';

  ActiveTasks: TasksArray[] = [];
  completedTasksArray: TasksArray[] = [];
  SelectedIndex: number = 0;
  ngOnInit() {
    this.apiServices.getTasks().subscribe(
      (response)=>{
         this.getAllTasks(response) 
        }
      )
  }

  getAllTasks(allTasks: any []){
    this.ActiveTasks = [];
    this.completedTasksArray = [];
    const allDates = allTasks.map(item => item.date)
    const dates =[...new Set(allDates)];
    dates.forEach(element => {
      const newActiveChild = allTasks.filter(item => item.date == element && item.status == false)
      const newCompletedChild = allTasks.filter(item => item.date == element && item.status == true)
      this.ActiveTasks.push({
        date: element,
        children: newActiveChild,
        display: false
      })
      this.completedTasksArray.push({
        date: element,
        children: newCompletedChild,
        display: false
      })
    });
  }

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

    this.apiServices.addTask(newTask).subscribe(()=>{console.log('Task has been Added!')})
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
    // this.toastr.info('Task has been Added!');
    // const time = TaskForm.controls['time'].value*60*60*1000
    // setTimeout(() => {
    //   this.completedTask(newTask)
    // }, time);
  }

  getIndex(index: number) {
    this.SelectedIndex = index;
  }

  completedTask(task: Task) {
    this.apiServices.updateStatus(task.date, this.SelectedIndex, task.status).subscribe(
      ()=>{
        console.log("update running!!", task.date, this.SelectedIndex, task.status)
      }
    )
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
        const updatedArray = this.ActiveTasks[i].children?.filter(item => item.taskID != this.SelectedIndex)
        this.ActiveTasks[i].children = updatedArray
        // this.ActiveTasks[i].children?.splice(this.SelectedIndex, 1);
        break;
      }
    }
    console.log(this.ActiveTasks, 'rempved');

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
function getAllTask(reponse: any) {
  throw new Error('Function not implemented.');
}

