import {
  AUDIENCE_FORM,
  CAMPAIGN_FORM,
  REWARDS_FORM,
  RULES_FORM,
} from 'src/app/core/constant/form.constants';
import { Component, OnInit } from '@angular/core';
import {
  GetAllCampaignInfo,
  editCampaignInfo,
  getCampaignInfo,
  resetFileNameAudiencePayload,
  resetFileUploadAudiencePayload,
} from 'src/app/core/store/campaign.actions';
import {
  GetAllLimitation,
  getLimitationInfo,
  updateLimitation,
} from 'src/app/core/store/limitation.action';
import {
  getAllRedemptions,
  getRedemptionInfo,
  updateRedemptionReward,
} from 'src/app/core/store/redemption.action';
import {
  getAllRewards,
  getRewardInfo,
  updateRewardPoints,
} from 'src/app/core/store/rewards.action';
import {
  getAllTypes,
  getTransactionTypeInfo,
  updateRulesType,
} from 'src/app/core/store/type.action';
import { getAudienceInfo, updateAudience, updateAudienceFile } from 'src/app/core/store/audience.action';

import { ActivatedRoute, Router } from '@angular/router';
import { AudienceStateModel } from 'src/app/core/models/audience.model';
import { CampaignInfo } from 'src/app/core/models/campaign.model';
import { LimitationModel } from 'src/app/core/models/limitation.model';
import { Observable } from 'rxjs';
import { RedemptionsModel } from 'src/app/core/models/redemption.model';
import { RewardsStateModel } from 'src/app/core/models/rewards.model';
import { Store } from '@ngxs/store';
import { TypesModel } from 'src/app/core/models/type.model';
import { AuthState } from '../../auth/store/auth.state';

@Component({
  selector: 'app-update-campaign',
  templateUrl: './update-campaign.component.html',
  styleUrls: ['./update-campaign.component.scss'],
})
export class UpdateCampaignComponent implements OnInit {
  mode!: string;
  form_type!: string;
  selectedIndex!: number;
  types$: Observable<TypesModel[]> | undefined;
  limitations$: Observable<LimitationModel[]> | undefined;
  limitation$: Observable<any> | undefined;
  type$: Observable<any> | undefined;
  redemptions$: Observable<RedemptionsModel[]> | undefined;
  rewards$: Observable<RewardsStateModel[]> | undefined;
  redemption$: Observable<RedemptionsModel[]> | undefined;
  reward$: Observable<RewardsStateModel[]> | undefined;
  audience$: Observable<AudienceStateModel[]> | undefined;
  campaignId = this.route.snapshot.params['id'];
  campaign_info$!: Observable<CampaignInfo>;
  audienceFileValuesPayload$: Observable<any> | undefined;
  audienceFileNamePayload$: Observable<any> | undefined
  campaignFormName = CAMPAIGN_FORM;
  audienceFormName = AUDIENCE_FORM;
  rulesFormName = RULES_FORM;
  rewardsFormName = REWARDS_FORM;
  userId = this.store.selectSnapshot(AuthState.getEncryptedUserId);
  name = this.store.selectSnapshot(AuthState.getEncryptedName);

  constructor(
    private route: ActivatedRoute,
    private store: Store,
    private router: Router) {}

  ngOnInit(): void {
    this.route.queryParams.subscribe((params) => {
      this.mode = params['mode'];
      this.form_type = params['form-type'];
      switch (this.form_type) {
        case CAMPAIGN_FORM:
          this.selectedIndex = 0;
          this.store.dispatch(new getCampaignInfo(this.campaignId));
          this.campaign_info$ = this.store.select((state) => state.campaign_info.campaign_info);
          break;
        case AUDIENCE_FORM:
          this.selectedIndex = 1;
          this.store.dispatch(new getAudienceInfo(this.campaignId));
          this.audience$ = this.store.select((state) => state.audience.audience);
          this.audienceFileValuesPayload$ = this.store.select((state) => state.payload_campaign_create.file_audience_payload);
          this.audienceFileNamePayload$ = this.store.select((state) => state.payload_campaign_create.file_name_audience_payload);
          break;
        case RULES_FORM:
          this.selectedIndex = 2;
          this.store.dispatch(new GetAllLimitation());
          this.store.dispatch(new getAllTypes());
          this.store.dispatch(new getLimitationInfo(this.campaignId));
          this.store.dispatch(new getTransactionTypeInfo(this.campaignId));
          this.types$ = this.store.select((state) => state.type.types);
          this.type$ = this.store.select((state) => state.type.type);
          this.limitations$ = this.store.select((state) => state.limitation.limitations);
          this.limitation$ = this.store.select((state) => state.limitation.limitation);
          break;
        case REWARDS_FORM:
          this.selectedIndex = 3;
          this.store.dispatch(new getAllRedemptions());
          this.store.dispatch(new getAllRewards());
          this.store.dispatch(new getRedemptionInfo(this.campaignId));
          this.store.dispatch(new getRewardInfo(this.campaignId));
          this.redemptions$ = this.store.select((state) => state.redemption.redemptions);
          this.redemption$ = this.store.select((state) => state.redemption.redemption);
          this.rewards$ = this.store.select((state) => state.rewards.rewards);
          this.reward$ = this.store.select((state) => state.rewards.reward);
          break;
        default:
      }
    });
  }

  updateForm(event: any) {
    switch (event.formPayload['form-type']) {
      case CAMPAIGN_FORM:
        delete event.formPayload['form-type'];
        this.store.dispatch(new editCampaignInfo({ ...event['formPayload'] }));
        break;
      case AUDIENCE_FORM:
        delete event.formPayload['form-type'];
        this.store.dispatch(new updateAudience(
          event['formPayload'].audienceListPayload,
          event['formPayload'].campaignId,
          event['formPayload'].isFileUpdated
          )
        ).subscribe({
          next: () => {
            if(event['formPayload'].isFileUpdated)
              this.store.dispatch(new updateAudienceFile({...event['formPayload'].filePayload}))
                .subscribe({
                  next: () => {
                    this.store.dispatch(new resetFileUploadAudiencePayload());
                    this.store.dispatch(new resetFileNameAudiencePayload());
                  }}
                );
          }
        });
        break;
      case RULES_FORM:
        delete event.formPayload['form-type'];
        this.store.dispatch( new updateRulesType({ ...event['rulesTypesPayload'] }));
        this.store.dispatch(new updateLimitation({ ...event['rulesLimitationsPayload']}));
        break;
      case REWARDS_FORM:
        delete event.formPayload['form-type'];
        this.store.dispatch(new updateRedemptionReward({ ...event['redemptionPayload'] }));
        this.store.dispatch(new updateRewardPoints({ ...event['rewardsPayload'] }));
        break;
      default:
    }
  }

  dashboard() {
    this.router.navigate(['/campaigns/campaign-dashboard'], {
      queryParams: {
        UserID: this.userId,
        Name: this.name,
      }
    });
  }
}
