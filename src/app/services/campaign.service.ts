import { CampaignInfo } from '../core/models/campaign.model';
import { CampaignInfoPayload } from './../core/models/campaign_info.model';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CampaignService {
  
  url = environment.apiURL;

  constructor(private http: HttpClient) { }

  getAllCampaignInfo(){
      return this.http.get<CampaignInfo[]>(`${this.url}/api/CampaignInfos/List`);
  }

  createCampaignInfo(payload:CampaignInfoPayload){
      return this.http.post(`${this.url}/api/CampaignInfos/create`,payload)
  }

  createCampaignOneSubmission(payload:any){
    return this.http.post(`${this.url}/api/Transactions/create/campaigns`,payload) 
  }

  getCampaignInfo(id:number){
      return this.http.get<CampaignInfo>(`${this.url}/api/CampaignInfos/list/${id}`)
  }

  deleteCampaignInfo(id:number){
      return this.http.delete(`${this.url}/api/CampaignInfos/delete/${id}`)
  }

  editCampaignInfo(payload:CampaignInfoPayload){
      return this.http.put(`${this.url}/api/Transactions/edit/campaign`,payload)
  }

}
