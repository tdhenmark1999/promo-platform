import { ActivatedRoute, Router } from '@angular/router';
import {
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';
import { Observable, Subject, takeUntil } from 'rxjs';
import { Select, Store } from '@ngxs/store';
import {
  createCampaignOneSubmission,
  resetCampaignInfoState,
} from './../../../core/store/campaign.actions';

import { AudienceModel } from './../../../core/models/audience.model';
import { FINAL_CAMPAIGN_FORM } from './../../../core/constant/form.constants';
import { GetAllAudience } from './../../../core/store/audience.action';
import { GetAllLimitation } from 'src/app/core/store/limitation.action';
import { LeaveCampaignModalComponent } from 'src/app/core/shared/components/leave-campaign-modal/leave-campaign-modal.component';
import { LimitationModel } from 'src/app/core/models/limitation.model';
import { NbDialogService } from '@nebular/theme';
import { RedemptionsModel } from './../../../core/models/redemption.model';
import { RewardsState } from 'src/app/core/store/rewards.state';
import { RewardsStateModel } from './../../../core/models/rewards.model';
import { TypesModel } from 'src/app/core/models/type.model';
import { getAllRedemptions } from 'src/app/core/store/redemption.action';
import {
  getAllRewards,
} from './../../../core/store/rewards.action';
import { getAllTypes } from 'src/app/core/store/type.action';
import { AuthState } from '../../auth/store/auth.state';

@Component({
  selector: 'app-create-campaign',
  templateUrl: './create-campaign.component.html',
  styleUrls: ['./create-campaign.component.scss'],
})
export class CreateCampaignComponent implements OnInit {
  
  audiences$: Observable<AudienceModel[]> | undefined;
  rewards$: Observable<RewardsStateModel[]> | undefined;
  redemptions$: Observable<RedemptionsModel[]> | undefined;
  limitations$: Observable<LimitationModel[]> | undefined;
  limitationLists: LimitationModel[] | undefined;
  types$: Observable<TypesModel[]> | undefined;
  private destroy$ = new Subject();
  fldCampaignId$: Observable<any> | undefined;
  fld_CodeEntryId$: Observable<any> | undefined;
  campaignPayload$: Observable<any> | undefined;
  audiencePayload$: Observable<any> | undefined;
  audienceFilePayload$: Observable<any> | undefined;
  limitationPayload$: Observable<any> | undefined;
  typesPayload$: Observable<any> | undefined;
  campaignInfo: Observable<any> | undefined;
  audienceFileNamePayload$: Observable<any> | undefined;
  mode!: string;
  userId = this.store.selectSnapshot(AuthState.getEncryptedUserId);
  name = this.store.selectSnapshot(AuthState.getEncryptedName);

  canLeaveAfterSave!: boolean

  constructor(
    private router: Router,
    private store: Store,
    private modalService: NbDialogService,
  ) {}

  canDeactivate(): Observable<boolean> | Promise<boolean> | boolean {

    if(this.canLeaveAfterSave){
      return true;
    }
    const canLeaveModal = this.modalService.open(LeaveCampaignModalComponent, {
      context: {},
    });
    return canLeaveModal.onClose;
  }  

  ngOnInit(): void {
    this.store.dispatch(new getAllRewards());
    this.store.dispatch(new getAllRedemptions());
    this.store.dispatch(new GetAllLimitation());
    this.store.dispatch(new getAllTypes());
    this.fldCampaignId$ = this.store.select((state) => state.payload_campaign_create.fld_CampaignId);
    this.fld_CodeEntryId$ = this.store.select((state) => state.payload_campaign_create.fld_CodeEntryId);
    this.campaignPayload$ = this.store.select((state) => state.payload_campaign_create.campaign_payload);
    this.audiencePayload$ = this.store.select((state) => state.payload_campaign_create.audience_payload);
    this.audienceFilePayload$ = this.store.select((state) => state.payload_campaign_create.file_audience_payload);
    this.limitationPayload$ = this.store.select((state) => state.payload_campaign_create.rules_limitations_payload);
    this.typesPayload$ = this.store.select((state) => state.payload_campaign_create.rules_types_payload);
    this.types$ = this.store.select((state) => state.type.types);
    this.limitations$ = this.store.select((state) => state.limitation.limitations);
    this.redemptions$ = this.store.select((state) => state.redemption.redemptions);
    this.rewards$ = this.store.select((state) => state.rewards.rewards);
    this.typesPayload$;
    this.audienceFileNamePayload$ = this.store.select((state) => state.payload_campaign_create.file_name_audience_payload);
    this.canLeaveAfterSave = false;
  }

  dashboard() {
    this.router.navigate(['/campaigns/campaign-dashboard'], {
      queryParams: {
        UserID: this.userId,
        Name: this.name,
      }
    });
  }

  campaignDetails() {
    this.router.navigate(['/campaigns/campaign-details']);
  }

  ngOnDestroy(): void {
    this.destroy$.next(null);
    this.destroy$.complete();
  }

  saveForm(event: any) {
    const form = event['form-type'];
    switch (form) {
      case FINAL_CAMPAIGN_FORM:
        this.store.dispatch(
          new createCampaignOneSubmission(event['createCampaignPayload'])).subscribe({
              next:() => {
                this.store.dispatch(new resetCampaignInfoState());
                this.canLeaveAfterSave = true;
              }
          });
        break;
      default:
    }
  }
}
