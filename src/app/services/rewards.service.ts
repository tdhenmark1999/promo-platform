import { RewardsPointsPayload } from './../core/models/campaign_info.model';
import { environment } from 'src/environments/environment';
import { Rewards } from './../core/models/rewards.model';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { RewardsRedemptionPayload } from '../core/models/campaign_info.model';

@Injectable({
  providedIn: 'root'
})
export class RewardsService {

  url = environment.apiURL;

  constructor(private http:HttpClient) { }

  getAllRewards(){
      return this.http.get<Rewards[]>(`${this.url}/api/Rewards/List`);
  }

  createRewardsPoints(payload:RewardsPointsPayload){
      return this.http.post(`${this.url}/api/Transactions/create/campaign-reward-points`,payload)
  }

  getRewardInfo(id: any) {
    return this.http.get<Rewards>(`${this.url}/api/Rewards/list/${id}`)
  }

  updateRewardPoints(payload:RewardsPointsPayload){
    return this.http.put
      (`${this.url}/api/Transactions/edit/campaign-reward-points`, payload)
  }
  
}
