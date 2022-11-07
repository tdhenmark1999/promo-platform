import {
  Action,
  Actions,
  Select,
  Selector,
  State,
  StateContext,
  Store,
} from '@ngxs/store';
import {
  CampaignInfoPayload,
  CampaignPayloadStateModel,
  SaveRulesPayload,
} from '../models/campaign_info.model';
import {
  LeaveCampaign,
  createCampaignInfo,
  createCampaignOneSubmission,
  editCampaignInfo,
  resetCampaignInfoState,
  resetFileNameAudiencePayload,
  resetFileUploadAudiencePayload,
  saveFileAudienceFileForm,
  saveFileAudienceFileNameForm,
  saveRewardsPointsInfoForm,
  saveRewardsRedemptionsInfoForm,
  saveRulesInfoForm,
} from './campaign.actions';
import {
  deleteCampaignInfo,
  saveAudienceInfoForm,
  saveCampaignInfoForm,
  saveLimitationInfoForm,
  saveRulesLimitationsForm,
  saveRulesTypesForm,
} from './campaign.actions';
import { tap, throwError } from 'rxjs';

import { AlertProvider } from './../providers/alert.provider';
import { AlertService } from 'src/app/services/alert.service';
import { CampaignService } from './../../services/campaign.service';
import { FileUploadService } from './../../services/file-upload.service';
import { Injectable } from '@angular/core';
import { Navigate } from '@ngxs/router-plugin';
import { NbToastrService } from '@nebular/theme';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { catchError } from 'rxjs/operators';

export interface CampaignPayloadModel {
  campaign_payload: boolean;
}

export interface FileAudienceModel {
  file_audience_payload: any;
}

@State<CampaignPayloadStateModel>({
  name: 'payload_campaign_create',
  defaults: {
    campaign_payload: null,
    audience_payload: null,
    rules_payload: null,
    rewards_redemptions_payload: null,
    rewards_points_payload: null,
    rules_limitations_payload: null,
    rules_types_payload: null,
    fld_CampaignId: null,
    fld_CodeEntryId: null,
    file_audience_payload: null,
    file_name_audience_payload: null,
  },
})
@Injectable()
export class CampaignState {
  @Selector()
  static getCampaignId(state: CampaignPayloadStateModel) {
    return state.fld_CampaignId;
  }

  @Selector()
  static getCampaignCodeEntryId(state: CampaignPayloadStateModel) {
    return state.fld_CodeEntryId;
  }

  @Selector()
  static getCampaignFormValue(state: CampaignPayloadStateModel) {
    return state.campaign_payload;
  }

  @Selector()
  static getAudienceFormValue(state: CampaignPayloadStateModel) {
    return state.audience_payload;
  }

  @Selector()
  static getAudienceFileNamePayload(state: CampaignPayloadStateModel) {
    return state.file_name_audience_payload;
  }

  constructor(
    private store: Store,
    private campaignService: CampaignService,
    private alertProvider: AlertProvider,
    private fileService: FileUploadService,
    private alertService: AlertService,
    private router: Router
  ) {}

  @Action(saveCampaignInfoForm)
  saveCampaignInfoForm(
    ctx: StateContext<CampaignPayloadStateModel>,
    { payload }: saveCampaignInfoForm
  ) {
    ctx.patchState({
      campaign_payload: payload,
    });
  }

  @Action(resetCampaignInfoState) resetCampaignInfoState(
    ctx: StateContext<CampaignPayloadModel>,
    {}: resetCampaignInfoState
  ) {
    const state = ctx.getState();
    ctx.setState({
      ...state,
      campaign_payload: !state.campaign_payload,
    });
  }

  @Action(saveAudienceInfoForm)
  saveAudienceInfoForm(
    ctx: StateContext<CampaignPayloadStateModel>,
    { payload }: saveAudienceInfoForm
  ) {
    ctx.patchState({
      audience_payload: payload,
    });
  }

  @Action(saveRulesInfoForm)
  saveRulesInfoForm(
    ctx: StateContext<CampaignPayloadStateModel>,
    { payload }: saveRulesInfoForm
  ) {
    ctx.patchState({
      rules_payload: payload,
    });
  }

  @Action(saveRewardsRedemptionsInfoForm)
  saveRewardsInfoForm(
    ctx: StateContext<CampaignPayloadStateModel>,
    { payload }: saveRewardsRedemptionsInfoForm
  ) {
    ctx.patchState({
      rewards_redemptions_payload: payload,
    });
  }

  @Action(saveRewardsPointsInfoForm)
  saveRewardsPointsInfoForm(
    ctx: StateContext<CampaignPayloadStateModel>,
    { payload }: saveRewardsPointsInfoForm
  ) {
    ctx.patchState({
      rewards_points_payload: payload,
    });
  }

  @Action(saveRulesLimitationsForm)
  saveRulesLimitationsForm(
    ctx: StateContext<CampaignPayloadStateModel>,
    { payload }: saveRulesLimitationsForm
  ) {
    ctx.patchState({
      rules_limitations_payload: payload,
    });
  }

  @Action(saveRulesTypesForm)
  saveLimitationInfoForm(
    ctx: StateContext<CampaignPayloadStateModel>,
    { payload }: saveRulesTypesForm
  ) {
    ctx.patchState({
      rules_types_payload: payload,
    });
  }

  @Action(saveFileAudienceFileNameForm)
  saveFileAudienceFileNameForm(
    ctx: StateContext<CampaignPayloadStateModel>,
    { payload }: saveFileAudienceFileNameForm
  ) {
    ctx.patchState({
      file_name_audience_payload: payload,
    });
  }

  @Action(saveFileAudienceFileForm)
  saveFileAudienceFileForm(
    ctx: StateContext<CampaignPayloadStateModel>,
    { payload }: saveFileAudienceFileForm
  ) {
    return this.fileService.fileUpload(payload).pipe(
      tap((result: any) => {
        ctx.patchState({
          file_audience_payload: result['customCampaignAudienceIds'],
        });
      }),
      catchError((err) => {
        return throwError(() => new Error(err));
      })
    );
  }

  @Action(resetFileUploadAudiencePayload)
  resetFileUploadAudiencePayload(
    ctx: StateContext<FileAudienceModel>,
    {}: resetFileUploadAudiencePayload
  ) {
    const state = ctx.getState();
    ctx.setState({
      ...state,
      file_audience_payload: null,
    });
  }

  @Action(resetFileNameAudiencePayload)
  resetFileNameAudiencePayload(
    ctx: StateContext<CampaignPayloadStateModel>,
    {}: resetFileNameAudiencePayload
  ) {
    const state = ctx.getState();
    ctx.setState({
      ...state,
      file_name_audience_payload: null,
    });
  }

  @Action(createCampaignInfo)
  createCampaignInfo(
    ctx: StateContext<CampaignPayloadStateModel>,
    { payload }: createCampaignInfo
  ) {
    return this.campaignService.createCampaignInfo(payload).pipe(
      tap((result: any) => {
        ctx.patchState({
          fld_CampaignId: result['response'].fld_CampaignId,
          fld_CodeEntryId: 1,
        });
      }),
      catchError((err) => {
        return throwError(() => new Error(err));
      })
    );
  }

  @Action(createCampaignOneSubmission)
  createCampaignOneSubmission(
    ctx: StateContext<any>,
    { payload }: createCampaignOneSubmission
  ) {
    return this.campaignService.createCampaignOneSubmission(payload).pipe(
      tap((result: any) => {
        this.alertService.show();
        this.router.navigate(
          [`/campaigns/campaign-detail/${result['response'].campaignId}`],{
            queryParams:{
              mode:null
            },
            queryParamsHandling: 'merge'}
        );
      }),
      catchError((err) => {
        this.alertProvider.errorSubmissionProvider(err);
        return throwError(() => new Error(err));
      })
    );
  }

  @Action(deleteCampaignInfo)
  deleteCampaignInfo(ctx: StateContext<any>, { id }: deleteCampaignInfo) {
    return this.campaignService.deleteCampaignInfo(id).pipe(
      tap((result: any) => {}),
      catchError((err) => {
        return throwError(() => new Error(err));
      })
    );
  }

  @Action(editCampaignInfo)
  editCampaignInfo(ctx: StateContext<any>, { payload }: editCampaignInfo) {
    return this.campaignService.editCampaignInfo(payload).pipe(
      tap((result: any) => {
        this.router.navigate([
          `/campaigns/campaign-detail/${payload['fld_CampaignId']}`,
        ],{
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
    );
  }

  @Action(LeaveCampaign)
  leaveCampaign(ctx: StateContext<any>, {}: LeaveCampaign) {
    const state = ctx.getState();
    ctx.patchState({
      ...state,
      campaign_payload: null,
    });
    // this.router.navigate([`/campaigns/campaign-dashboard`]);
  }

  
}
