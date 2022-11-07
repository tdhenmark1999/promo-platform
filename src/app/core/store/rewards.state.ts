import { Action, Selector, State, StateContext, Store } from '@ngxs/store';
import { Rewards, RewardsStateModel } from '../models/rewards.model';
import { createRewardPoints, getAllRewards, getRewardInfo, updateRewardPoints } from './rewards.action';
import { tap, throwError } from 'rxjs';

import { Injectable } from '@angular/core';
import { RewardsService } from './../../services/rewards.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { catchError } from 'rxjs/operators';

@State<RewardsStateModel>({
  name: 'rewards',
  defaults: {
    reward: undefined,
    rewards: [],
  },
})
@Injectable()
export class RewardsState {

  @Selector()
  static getAllRewards(state: RewardsStateModel) {
    return state.rewards;
  }
  

  @Selector()
  static getRewardInfo(state: RewardsStateModel) {
    return state.reward;
  }

  constructor(
    private rewardsService: RewardsService,
    private router: Router) {}

  @Action(getAllRewards)
  getAllRewards({ patchState }: StateContext<RewardsStateModel>,{}: getAllRewards) {
    return this.rewardsService.getAllRewards().pipe(
      tap((result: any) => {
        patchState({
          rewards: result['response'],
        });
      }),
      catchError((err) => {
        return throwError(() => new Error(err));
      })
    );
  }

  @Action(createRewardPoints)
  createRewardPoints({ patchState }: StateContext<any>,{ payload }: createRewardPoints) {
    return this.rewardsService.createRewardsPoints(payload).pipe(
      tap((result: any) => {}),
      catchError((err) => {
        return throwError(() => new Error(err));
      })
    );
  }

  @Action(getRewardInfo)
  getRewardInfo({ patchState }: StateContext<RewardsStateModel>, {id}: getRewardInfo) {
    return this.rewardsService.getRewardInfo(id).pipe(
      tap((result:Rewards) => {
        patchState({
          reward: result['response']
        })
      }), catchError((err) => {
        return throwError(() => new Error(err));
      })
    )
  }

  @Action(updateRewardPoints)
  updateRewardPoints({ patchState }: StateContext<any>, { payload }: updateRewardPoints){
    return this.rewardsService.updateRewardPoints(payload).pipe(
      tap((result: any) => {
        this.router.navigate([`/campaigns/campaign-detail/${payload['fld_CampaignId']}`],
        {
          queryParams: {
            mode: null,
            'form-type': null
          },
          queryParamsHandling: 'merge'
        });
        Swal.fire('Success', result['message'], 'success');
      }),
      catchError((err) => {
          return throwError(() => new Error(err));
      })
    )
  }
}
