import { Action, Selector, State, StateContext, Store } from '@ngxs/store';
import { GetAllAudience, getAudienceInfo, updateAudience, updateAudienceFile } from './audience.action';
import { Route, Router } from '@angular/router';
import { resetFileNameAudiencePayload, resetFileUploadAudiencePayload } from './campaign.actions';
import { tap, throwError } from 'rxjs';

import { AudienceModel } from './../models/audience.model';
import { AudienceService } from './../../services/audience.service';
import { AudienceStateModel } from '../models/audience.model';
import { Injectable } from '@angular/core';
import Swal from 'sweetalert2';
import { catchError } from 'rxjs/operators';

@State<AudienceStateModel>({
  name: 'audience',
  defaults: {
    audience: undefined,
    audiences: [],
  },
})

@Injectable()
export class AudienceState {
    
  @Selector()
  static getAllAudiences(state: AudienceStateModel) {
    return state.audiences;
  }

  @Selector()
  static getAudienceInfo(state: AudienceStateModel) {
    return state.audiences;
  }

  constructor(
    private audienceService: AudienceService,
    private router: Router) {}

  @Action(GetAllAudience)
  getAllAudience(ctx: StateContext<AudienceStateModel>, {}: GetAllAudience) {
    return this.audienceService.getAllAudience().pipe(
      tap((result: AudienceModel[]) => {
        ctx.patchState({
          audiences: result['response'],
        });
      }),
      catchError((err) => {
        return throwError(() => new Error(err));
      })
    );
  }

  @Action(getAudienceInfo)
  getAudienceInfo({ patchState }: StateContext<AudienceStateModel>, {id}: getAudienceInfo) {
    return this.audienceService.getAudienceInfo(id).pipe(
      tap((result: AudienceModel) => {
        patchState({
          audience: result['response']
        })
      }), catchError((err) => {
        return throwError(() => new Error(err));
      })
    )
  }

  @Action(updateAudience)
  updateAudience({ patchState}: StateContext<any>, {payload, campaignId, isFileUpdated}: any){
    return this.audienceService.updateAudience(payload).pipe(
      tap((result: any) => {
        Swal.fire('Success', result['message'], 'success');
        if(!isFileUpdated)
          this.router.navigate([`/campaigns/campaign-detail/${campaignId}`],{
            queryParams: {
              mode: null,
              'form-type': null
            },
            queryParamsHandling: 'merge'
          });
        
      }),
      catchError((err) => {
          return throwError(() => new Error(err));
      })
    )
  }

  @Action(updateAudienceFile)
  updateAudienceFile({ patchState}: StateContext<any>, {payload}: updateAudienceFile){
    return this.audienceService.updateAudienceFile(payload).pipe(
      tap((result: any) => {
        this.router.navigate([`/campaigns/campaign-detail/${payload['fld_CampaignId']}`],{
          queryParams: {
            mode: null,
            'form-type': null
          },
          queryParamsHandling: 'merge'
        });
      }),
      catchError((err) => {
        return throwError(() => new Error(err));
      })
    );
  }
   
}
