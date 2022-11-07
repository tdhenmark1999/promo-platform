import {
  AUDIENCE_FORM,
  CAMPAIGN_FORM,
  REWARDS_FORM,
  RULES_FORM,
} from 'src/app/core/constant/form.constants';
import { ActivatedRoute, Router } from '@angular/router';
import { Component, Input, OnInit } from '@angular/core';

import { ActivityLogs } from './../../../models/activity_logs.model';
import { AudienceModel } from 'src/app/core/models/audience.model';
import { CampaignInfo } from 'src/app/core/models/campaign.model';
import { CampaignService } from 'src/app/services/campaign.service';
import { LimitationModel } from 'src/app/core/models/limitation.model';
import { Observable } from 'rxjs';
import { RedemptionsModel } from 'src/app/core/models/redemption.model';
import { Rewards } from 'src/app/core/models/rewards.model';
import { TypesModel } from './../../../models/type.model';

@Component({
  selector: ' <app-campaign-detail></app-campaign-detail>',
  templateUrl: './campaign-detail.component.html',
  styleUrls: ['./campaign-detail.component.scss'],
})
export class CampaignDetailComponent implements OnInit {
  @Input() campaignDetails: any;
  @Input() campaignList: any;

  @Input() campaign_info!: CampaignInfo | any;
  @Input() type!: TypesModel | any;
  @Input() reward!: Rewards | any;
  @Input() limitation!: LimitationModel | any;
  @Input() redemption!: RedemptionsModel | any;
  @Input() audience!: AudienceModel[] | any;
  @Input()isCampaignInfoLoading!: boolean | any;

  campaignId = this.route.snapshot.params['id'];

  campaignInfo$!: Observable<any>;

  fId_CampaignName!: string;
  fIdCampaignId!: string;

  constructor(
    private campaignService: CampaignService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {}

  updateCampaign(form: any) {
    this.router.navigate([`/campaigns/update-campaign/${this.campaignId}`], {
      queryParams: {
        mode: 'edit',
        ['form-type']:
          form['form_type'] === CAMPAIGN_FORM
            ? CAMPAIGN_FORM
            : form['form_type'] === AUDIENCE_FORM
            ? AUDIENCE_FORM
            : form['form_type'] === RULES_FORM
            ? RULES_FORM
            : form['form_type'] === REWARDS_FORM
            ? REWARDS_FORM
            : null,
      },
      queryParamsHandling: 'merge'
    });
  }

  

  disableAudienceEdit(data: any) {
    if (data != undefined) {
      const startDate = new Date(data.fld_StartDate);
      startDate.setHours(0, 0, 0, 0);
      startDate.setDate(startDate.getDate() - 2);

      const today = new Date();
      today.setHours(0, 0, 0, 0);

      return today < startDate;
    }
    return false;
  }

  disableAllEdit(data: any) {
    //Should also consider filtering fld_IsStatus in the future
    //ex active status
    if (data != undefined) {
      const startDate = new Date(data.fld_StartDate);
      startDate.setHours(0, 0, 0, 0);
      startDate.setDate(startDate.getDate());
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      return today <= startDate;
    }
    return false;
  }

}
