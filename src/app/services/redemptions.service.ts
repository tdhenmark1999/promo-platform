import { RedemptionsModel } from './../core/models/redemption.model';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Injectable } from '@angular/core';
import { RewardsRedemptionPayload } from '../core/models/campaign_info.model';

@Injectable({
  providedIn: 'root'
})
export class RedemptionsService {

  url = environment.apiURL;

  constructor(private http:HttpClient) { }


  getRedemption(){
      return  this.http.get<RedemptionsModel[]>(`${this.url}/api/Redemptions/List`)
  }

  createRewardRedemption(payload:RewardsRedemptionPayload){
    return this.http.post(`${this.url}/api/Transactions/create/campaign-reward-redemption`,payload)
  }

  getRedemptionInfo(id: any) {
    return this.http.get<RedemptionsModel>(`${this.url}/api/Redemptions/list/${id}`)
  }

  updateRedemption(payload:RewardsRedemptionPayload){
    return this.http.put
      (`${this.url}/api/Transactions/edit/campaign-reward-redemption`, payload)
  }
}
