import { HttpClient, HttpParams } from '@angular/common/http';
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
    const params = new HttpParams()
      .set('date', date.toString()) // Convert Date to ISO format string
      .set('taskID', taskID.toString())
      .set('status', status.toString());

    return this.http.put(this.base_url + 'updatestatus', {}, { params });
  }
}
