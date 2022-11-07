import { catchError } from 'rxjs/operators';
import { LimitationModel } from '../models/limitation.model';
import { LimitationService } from 'src/app/services/limitation.service';
import { GetAllLimitation, createLimitationInfo, getLimitationInfo, updateLimitation } from './limitation.action';
import { Injectable } from '@angular/core';
import { LimitationStateModel } from '../models/limitation.model';
import { Selector, State, Store, Action, StateContext } from '@ngxs/store';
import { tap, throwError } from 'rxjs';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@State<LimitationStateModel>({
  name: 'limitation',
  defaults: {
    limitation: undefined,
    limitations: [],
  },
})
@Injectable()
export class LimitationState {

  @Selector()
  static getAllLimitations(state: LimitationStateModel) {
    return state.limitations;
  }

  @Selector()
  static getLimitationInfo(state:LimitationStateModel) {
    return state.limitation;
  }

  constructor(
    private store: Store,
    private limitationService: LimitationService,
    private router: Router
  ) {}

  @Action(GetAllLimitation)
  getAllLimitation({ patchState }: StateContext<LimitationStateModel>,{}: GetAllLimitation) {
    return this.limitationService.getAllLimitation().pipe(
      tap((result: any) => {
        patchState({
          limitations: result['response'],
        });
      }),
      catchError((err) => {
        return throwError(() => new Error(err));
      })
    );
  }


  @Action(createLimitationInfo)
  createLimitationInfo({patchState} : StateContext<any>,{payload} : createLimitationInfo) {
      return this.limitationService.createLimitation(payload).pipe(
        tap((result:any)=>{

        }),
        catchError((err)=>{
            return throwError(() => new Error(err))
        })
      )
  }

  @Action(getLimitationInfo)
  getLimitationInfo({ patchState }: StateContext<LimitationStateModel>, {id}: getLimitationInfo) {
    return this.limitationService.getLimitationInfo(id).pipe(
      tap((result: LimitationModel) => {
        patchState({
          limitation: result['response']
        })
      }), catchError((err) => {
        return throwError(() => new Error(err));
      })
    )
  }

  @Action(updateLimitation)
  updateLimitation({ patchState }: StateContext<any>, {payload}: updateLimitation) {
    return this.limitationService.updateLimitation(payload).pipe(
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
