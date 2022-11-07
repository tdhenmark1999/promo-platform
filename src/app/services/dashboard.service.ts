import { Dashboard } from './../core/models/dashboard.model';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {

  url = environment.apiURL;


  constructor(private http:HttpClient) { }

    getAllDashboardData(){
      return this.http.get<Dashboard[]>(`${this.url}/api/CampaignInfos/list/dashboard`);
    }

    getDashboardDataPerPage(key:string,pageNumber:string, status:number, service:string){
      return this.http.get(
        `${this.url}/api/CampaignInfos/list/dashboard?limit=15&page=${pageNumber}&Search=${key}&Status=${status}&Service=${service}`
      );
    }

} 
