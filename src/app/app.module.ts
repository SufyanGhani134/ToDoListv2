import { HttpClient, HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { TaskFormComponent } from './task-form/task-form.component';
import { TasksListComponent } from './tasks-list/tasks-list.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { DragDropModule } from '@angular/cdk/drag-drop'
import { ToastrModule, provideToastr } from 'ngx-toastr';


@NgModule({
  declarations: [
    AppComponent,
    TaskFormComponent,
    TasksListComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    NgbModule,
    DragDropModule,
    ToastrModule.forRoot(),
    HttpClientModule
  ],
  providers: [
    provideToastr({
      timeOut: 10000,
      positionClass: 'toast-top-right',
      preventDuplicates: true,
      progressBar: true
    }),
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
