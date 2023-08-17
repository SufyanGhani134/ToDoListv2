import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { Task } from '../task';

@Injectable({
  providedIn: 'root'
})
export class ApiServicesService {

  base_url:string = "http://localhost:58988/";

  constructor(private http: HttpClient) { }

  getTasks(): Observable<any> {
    return this.http.get(this.base_url+"getalltasks");
  }

  addTask(task: Task): Observable<any> {
    return this.http.post(this.base_url+"addtask", task)
  }

  updateStatus(date: Date, taskID: number, status: boolean): Observable<any> {
    return this.http.post(this.base_url+`updateTask?date=${date}&taskID=${taskID}&status=${status}`, {})
  }
}
