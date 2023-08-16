import { Component, EventEmitter, Output } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-task-form',
  templateUrl: './task-form.component.html',
  styleUrls: ['./task-form.component.css']
})
export class TaskFormComponent {

  taskForm: FormGroup = new FormGroup({
    title : new FormControl(''),
    detail: new FormControl(''),
    date: new FormControl(''),
    time: new FormControl('')
  })

  @Output()
  SendNewTask: EventEmitter<FormGroup> = new EventEmitter<FormGroup>();

  AddTask(){
    debugger;
    this.SendNewTask.emit(this.taskForm);
  }
}
