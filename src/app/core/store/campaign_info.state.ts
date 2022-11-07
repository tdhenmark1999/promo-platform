import { Action, Selector, State, StateContext } from '@ngxs/store';
import { GetAllCampaignInfo, getCampaignInfo } from './campaign.actions';
import { catchError, tap, throwError } from 'rxjs';

import { CampaignInfo } from './../models/campaign.model';
import { CampaignInfoStateModel } from '../models/campaign.model';
import { CampaignService } from './../../services/campaign.service';
import { Injectable } from '@angular/core';

@State<CampaignInfoStateModel>({
  name: 'campaign_info',
  defaults: {
    campaign_info: undefined,
    campaign_infos: [],
    isCampainInfoIdLoading:undefined
  },
})
@Injectable()
export class CampaignInfoState {

  @Selector()
  static getAllCampaignInfo(state: CampaignInfoStateModel) {
    return state.campaign_infos;
  }

  @Selector()
  static getCampaignInfo(state:CampaignInfoStateModel){
      return state.campaign_info;
  }

  constructor(private campaignService: CampaignService) {}

  @Action(GetAllCampaignInfo)
  getAllCampaignInfo({ patchState }: StateContext<CampaignInfoStateModel>,{}: GetAllCampaignInfo) {
    return this.campaignService.getAllCampaignInfo().pipe(
      tap((result: CampaignInfo[]) => {
        patchState({
          campaign_infos: result['response'],
        });
      }),
      catchError((err) => {
        return throwError(() => new Error(err));
      })
    );
  }

  @Action(getCampaignInfo)
  getCampaignInfo({patchState} : StateContext<CampaignInfoStateModel>, {id} :getCampaignInfo) {
      patchState({isCampainInfoIdLoading:true})
      return this.campaignService.getCampaignInfo(id).pipe(
          tap((result:CampaignInfo)=>{
              patchState({
                  campaign_info:result['response'],
                  isCampainInfoIdLoading:true
              })
          }),
          catchError((err) => {
            return throwError(() => new Error(err));
        })
      )
  }
}
