import { Action, Selector, State, StateContext, Store } from '@ngxs/store';
import { RedemptionsModel, RedemptionsStateModel } from '../models/redemption.model';
import { catchError, tap, throwError } from 'rxjs';
import { createRedemptionReward, getAllRedemptions, getRedemptionInfo, updateRedemptionReward } from './redemption.action';

import { Injectable } from '@angular/core';
import { RedemptionsService } from './../../services/redemptions.service';

@State<RedemptionsStateModel>({
  name: 'redemption',
  defaults: {
    redemption: undefined,
    redemptions: [],
  },
})
@Injectable()
export class RedemptionState {

  @Selector()
  getAllRedemption(state: RedemptionsStateModel) {
    return state.redemptions;
  }

  @Selector()
  static getRedemption(state: RedemptionsStateModel){
    return state.redemption
  }

  constructor(
    private redemptionService: RedemptionsService,
    private store: Store
  ) {}

  @Action(getAllRedemptions)
  getAllRedemptions(
    { patchState }: StateContext<RedemptionsStateModel>,
    {}: getAllRedemptions
  ) {
    return this.redemptionService.getRedemption().pipe(
      tap((result: any) =>
        patchState({
          redemptions: result['response'],
        })
      ),
      catchError((err) => {
        return throwError(() => new Error(err));
      })
    );
  }

  @Action(createRedemptionReward)
  createRedemptionReward(
    { patchState }: StateContext<any>,
    { payload }: createRedemptionReward
  ) {
    return this.redemptionService.createRewardRedemption(payload).pipe(
      tap((result: any) => {
      }),
      catchError((err) => {
        return throwError(() => new Error(err));
      })
    );
  }

  @Action(getRedemptionInfo)
  getRedemptionInfo({ patchState }: StateContext<RedemptionsStateModel>, {id}: getRedemptionInfo){
    return this.redemptionService.getRedemptionInfo(id).pipe(
      tap((result: RedemptionsModel) => {
        patchState({
          redemption: result['response']
        })
      }), catchError((err) => {
        return throwError(() => new Error(err));
      })
    )
  }

  @Action(updateRedemptionReward)
  updateRedemptionReward({ patchState }: StateContext<any>, { payload }: updateRedemptionReward){
    return this.redemptionService.updateRedemption(payload).pipe(
      tap((result: any) => {
      }),
      catchError((err) => {
        return throwError(() => new Error(err));
      })
    );
  }
}
