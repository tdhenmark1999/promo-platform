import { AudienceInfoPayload } from '../core/models/campaign_info.model';
import { AudienceModel } from './../core/models/audience.model';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AudienceService {

  url = environment.apiURL;

  constructor(private http:HttpClient) { }

  getAllAudience(){
      return this.http.get<AudienceModel[]>(`${this.url}/api/Audiences/List`);
  }

  getAudienceInfo(id: any) {
    return this.http.get<AudienceModel>(`${this.url}/api/Audiences/list/${id}`)
  }

  updateAudience(payload: any){
    return this.http.put(`${this.url}/api/Transactions/edit/campaign-audiences`, payload);
  }

  updateAudienceFile(payload: any){
    return this.http.put(`${this.url}/api/Transactions/edit/campaign-custom-audience-file`, payload);
  }

}
