import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { TaskFormComponent } from './task-form/task-form.component';
import { TasksListComponent } from './tasks-list/tasks-list.component';
import { DragulaModule } from 'ng2-dragula';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent,
    TaskFormComponent,
    TasksListComponent
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    DragulaModule.forRoot(),
    NgbModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
