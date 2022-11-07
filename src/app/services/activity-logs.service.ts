import { ActivityLogs } from './../core/models/activity_logs.model';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})

export class ActivityLogsService {

  url = environment.apiURL;


  constructor(private http:HttpClient) { }

  getActivityLogs(id:number){
      return this.http.get<ActivityLogs[]>(`${this.url}/api/ActivityLog/list/${id}`)
  }

}
