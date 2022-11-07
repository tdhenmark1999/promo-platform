import { RulesLimitationsPayload } from './../core/models/campaign_info.model';
import { environment } from 'src/environments/environment';
import { LimitationModel } from '../core/models/limitation.model';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LimitationService {

  url = environment.apiURL;

  constructor(private http: HttpClient) { }

  getAllLimitation() {
    return this.http.get<LimitationModel[]>(`${this.url}/api/Limitations/list`);
  }

  createLimitation(payload:RulesLimitationsPayload){
    return this.http.post(`${this.url}/api/Transactions/create/campaign-rules-limitations`,payload)
  }

  getLimitationInfo(id: any) {
    return this.http.get<LimitationModel>(`${this.url}/api/Limitations/list/${id}`)
  }

  updateLimitation(payload: RulesLimitationsPayload){
    return this.http.put<RulesLimitationsPayload>
      (`${this.url}/api/Transactions/edit/campaign-rules-limitations`, payload);
  }

}
