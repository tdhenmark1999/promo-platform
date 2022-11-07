import { ActionsExecuting, actionsExecuting } from '@ngxs-labs/actions-executing';
import { ActivatedRoute, Router } from '@angular/router';
import { Component, Injectable, OnInit } from '@angular/core';
import { Observable, Subject, takeUntil } from 'rxjs';
import { Select, Store } from '@ngxs/store';

import { ActivityLogs } from 'src/app/core/models/activity_logs.model';
import { AudienceModel } from 'src/app/core/models/audience.model';
import { CampaignInfo } from 'src/app/core/models/campaign.model';
import { CampaignInfoState } from './../../../core/store/campaign_info.state';
import { DeleteModalComponent } from '../../delete-modal/delete-modal.component';
import { LimitationModel } from 'src/app/core/models/limitation.model';
import { NbDialogService } from '@nebular/theme';
import { RedemptionsModel } from './../../../core/models/redemption.model';
import { Rewards } from 'src/app/core/models/rewards.model';
import { TypesModel } from 'src/app/core/models/type.model';
import { getActivityLogs } from './../../../core/store/activity_logs.actions';
import { getAudienceInfo } from 'src/app/core/store/audience.action';
import {
  getCampaignInfo,
} from './../../../core/store/campaign.actions';
import { getLimitationInfo } from 'src/app/core/store/limitation.action';
import { getRedemptionInfo } from 'src/app/core/store/redemption.action';
import { getRewardInfo } from 'src/app/core/store/rewards.action';
import { getTransactionTypeInfo } from './../../../core/store/type.action';

@Component({
  selector: 'app-campaign-details',
  templateUrl: './campaign-details.component.html',
  styleUrls: ['./campaign-details.component.scss'],
})
@Injectable()
export class CampaignDetailsComponent implements OnInit {
  campaign$!: Observable<CampaignInfo> | any;
  campaignId = this.route.snapshot.params['id'];
  closeResult = '';

  @Select(CampaignInfoState.getCampaignInfo)
  campaign_info$!: Observable<CampaignInfo>;
  audience$!: Observable<AudienceModel>;
  redemption$!: Observable<RedemptionsModel>;
  reward$!: Observable<Rewards> | any;
  type$!: Observable<TypesModel> | any;
  limitation$!: Observable<LimitationModel> | any;
  activityLogs$!: Observable<ActivityLogs[]> | any;
  activityLogsLength!: number;

  private destroy$ = new Subject();
  limitationId!: string;
  rewardId!: string;
  redemptionId!: string;
  audienceId!: string;
  transactionId!: string;
  @Select(actionsExecuting([getCampaignInfo]))
  isCampaignInfoLoading$!: Observable<ActionsExecuting>;

  constructor(
    private router: Router,
    private store: Store,
    private route: ActivatedRoute,
    private modalService: NbDialogService
  ) {}

  ngOnInit(): void {
    this.store.dispatch(new getCampaignInfo(this.campaignId));
    this.store.dispatch(new getTransactionTypeInfo(this.campaignId));
    this.store.dispatch(new getRewardInfo(this.campaignId));
    this.store.dispatch(new getLimitationInfo(this.campaignId));
    this.store.dispatch(new getAudienceInfo(this.campaignId));
    this.store.dispatch(new getRedemptionInfo(this.campaignId));
    this.store.dispatch(new getActivityLogs(this.campaignId));
    this.audience$ = this.store.select((state) => state.audience.audience);
    this.redemption$ = this.store.select((state) => state.redemption.redemption);
    this.reward$ = this.store.select((state) => state.rewards.reward);
    this.type$ = this.store.select((state) => state.type.type);
    this.limitation$ = this.store.select((state) => state.limitation.limitation);
    this.activityLogs$ = this.store.select((state)=> state.activity_logs.activity_logs);
    this.activityLogs$.pipe(takeUntil(this.destroy$)).subscribe((result:[]) =>{
      this.activityLogsLength = result?.length
    });
  }

  dashboard() {
    this.router.navigate(['/'],{
      queryParamsHandling:'preserve'
    });
  }

  deleteCampaignModal() {
    this.modalService.open(DeleteModalComponent, {
      context: {
        campaignId: this.campaignId,
      },
    });
    console.log(this.campaignId, 'test')
  }

  ngOnDestory() {
    this.destroy$.next(null);
  }

  
}
