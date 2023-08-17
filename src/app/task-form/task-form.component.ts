import { Component, EventEmitter, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-task-form',
  templateUrl: './task-form.component.html',
  styleUrls: ['./task-form.component.css']
})
export class TaskFormComponent {
  constructor(private toastr: ToastrService) {}

  Error: boolean = false;

  taskForm: FormGroup = new FormGroup({
    title : new FormControl('',[Validators.required, Validators.minLength(3), Validators.maxLength(50)]),
    detail: new FormControl('',Validators.maxLength(200)),
    date: new FormControl('',Validators.required),
    time: new FormControl('',Validators.required)
  })

  @Output()
  SendNewTask: EventEmitter<FormGroup> = new EventEmitter<FormGroup>();

  AddTask(){ 
    try {
      if (this.taskForm.get('title')?.errors?.['required']) {
        throw "Title Required";
      }
      else if (this.taskForm.get('title')?.errors?.['minlength']) {
        throw "Invalid Title";
      }
      else if (this.taskForm.get('title')?.errors?.['maxlength']) {
        throw "Invalid Title";
      }
      else if (this.taskForm.get('detail')?.errors?.['touched']) {
        throw "Details Required";
      }
      else if (this.taskForm.get('detail')?.errors?.['maxlength']) {
        throw "Invalid Details";
      }
      else if (this.taskForm.get('date')?.errors?.['required']) {
        throw "Invalid Date";
      }
      else if (this.taskForm.get('time')?.errors?.['required']) {
        throw "Invalid Time";
      }else{
        this.Error = false;
      }
   0   
    } catch (error: any) {
      this.Error = true;
      alert(error.toString());
    }
    if(!this.Error){
      this.SendNewTask.emit(this.taskForm);
    }
    
  }
}
