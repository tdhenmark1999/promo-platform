import {
  CAMPAIGN_FORM,
  FINAL_CAMPAIGN_FORM,
  REWARDS_FORM,
} from './../../../constant/form.constants';
import {
  ChangeDetectorRef,
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Observable, Subject, of } from 'rxjs';
import { Select, Store } from '@ngxs/store';
import {
  saveRewardsPointsInfoForm,
  saveRewardsRedemptionsInfoForm,
} from './../../../store/campaign.actions';

import { AudienceInfoPayload } from './../../../models/campaign_info.model';
import { CampaignState } from '../../../store/camapaign.state';
import { Router } from '@angular/router';
import { AuthState } from 'src/app/components/auth/store/auth.state';

@Component({
  selector: 'app-rewards-form',
  templateUrl: './rewards-form.component.html',
  styleUrls: ['./rewards-form.component.scss'],
})
export class RewardsFormComponent implements OnInit {
  @Input() redemption: any;
  @Input() rewards: any;
  isHiddenRedemption = false;
  submitButtonStatus = true;
  formSubmitAttempt = false;
  private destroy$ = new Subject();
  formType = REWARDS_FORM;

  redemptionForm!: FormGroup;
  rewardForm!: FormGroup;
  submitAttemp = false;

  @Output() rewardsFormValue = new EventEmitter<any>();
  @Input() fldCampaignId: any;
  @Input() fldCodeEntryId: any;
  @Input() campaignPayload: any;
  @Input() audiencePayload: AudienceInfoPayload | any;
  @Input() rewardRedemptionPayload: any;
  @Input() rewardPointsPayload: any;
  @Input() uploadedFile: any;
  @Input() limitationPayload: any;
  @Input() typesPayload: any;
  @Input() audienceFileNamePayload!: string;
  @Input() mode: any;
  //Update vars
  @Input() rewardValues: any;
  @Input() redemptionValues: any;
  campaignRedemptionId!: number;
  campaignRewardsId!: number;
  codeEntryId!: number;
  @Output() campaignFormValue = new EventEmitter<any>();
  @Output() updateRewardsFormValue = new EventEmitter<any>();
  userId = this.store.selectSnapshot(AuthState.getEncryptedUserId);
  name = this.store.selectSnapshot(AuthState.getEncryptedName);

  constructor(
    private router: Router,
    private fb: FormBuilder,
    private ref: ChangeDetectorRef,
    private store: Store
  ) {
    this.redemptionForm = this.fb.group({
      fld_RedemptionId: ['', Validators.required],
      other_portal: [''],
      fld_Value: [''],
    });

    this.rewardForm = this.fb.group({
      fld_RewardId: [null, Validators.required],
      fld_PointsRebate: [0],
      fld_FixedPoints: [0],
    });
  }

  ngOnInit(): void {
    if (this.mode == 'edit') this.setValuesOfForms();
  }

  ngOnChanges() {
    if (this.mode == 'edit') this.setValuesOfForms();
  }

  campaignDetails() {
    this.router.navigate(['/campaigns/campaign-details']);
  }

  setValuesOfForms() {
    if (this.redemptionValues) {
      this.redemptionForm.patchValue({
        ...this.redemptionValues,
      });
      this.codeEntryId = this.redemptionValues.fld_CodeEntryId;
      this.campaignRedemptionId =
        this.redemptionValues.fld_CampaignRedemptionId;
    }
    if (this.rewardValues) {
      this.rewardForm.patchValue({
        ...this.rewardValues,
      });
      //set Validation On input forms
      this.onRewardsChange(this.rewardValues.fld_RewardId);
      this.campaignRewardsId = this.rewardValues.fld_CampaignRewardId;
    }
  }

  get errorInRedemptionForm() {
    return !this.redemptionForm.valid && this.redemptionForm.touched;
  }

  get errorInRewardForm() {
    return (
      (!this.rewardForm.valid && this.redemptionForm.touched) ||
      (!this.rewardForm.valid &&
        this.rewardForm.get('fld_PointsRebate')?.touched) ||
      (!this.rewardForm.valid &&
        this.rewardForm.get('fld_FixedPoints')?.touched)
    );
  }

  updateForm() {
    if (this.rewardForm.valid && this.redemptionForm.valid) {
      this.updateRewardsFormValue.emit({
        formPayload: {
          'form-type': 'Rewards',
        },
        redemptionPayload: {
          fld_CampaignRedemptionId: this.campaignRedemptionId,
          fld_CampaignId: +this.fldCampaignId,
          fld_CodeEntryId: this.codeEntryId,
          fld_IsDeleted: 0,
          fld_RedemptionId: this.redemptionForm.get('fld_RedemptionId')?.value,
        },
        rewardsPayload: {
          fld_CampaignRewardId: this.campaignRewardsId,
          fld_CampaignId: +this.fldCampaignId,
          ...this.rewardForm.value,
        },
      });
    }
  }

  setSubmitButton(flag: boolean) {
    this.submitButtonStatus = flag;
  }

  getSubmitButton() {
    return this.submitButtonStatus;
  }

  onRedemptionChange(event: any) {
    if (event == 1 || event == 2) {
      this.redemptionForm.get('fld_Value')?.reset();
    } else if (event == 3) {
      this.redemptionForm.patchValue({
        ...this.redemptionValues,
      });
    }
  }

  onRewardsChange(rewardsValue: number) {
    // //add validation on rebate input form
    if (rewardsValue == 2)
      this.rewardForm
        .get('fld_FixedPoints')
        ?.addValidators([Validators.required, Validators.pattern('^[0-9]*$')]);
    else {
      this.rewardForm.get('fld_FixedPoints')?.clearValidators();
      this.rewardForm.get('fld_FixedPoints')?.updateValueAndValidity();
      this.rewardForm.get('fld_FixedPoints')?.setValue(0);
    }

    if (rewardsValue == 3)
      this.rewardForm
        .get('fld_PointsRebate')
        ?.addValidators([
          Validators.required,
          Validators.pattern('^[0-9]*$'),
          Validators.max(100),
          Validators.min(1),
        ]);
    else {
      this.rewardForm.get('fld_PointsRebate')?.clearValidators();
      this.rewardForm.get('fld_PointsRebate')?.updateValueAndValidity();
      this.rewardForm.get('fld_PointsRebate')?.setValue(0);
    }
  }

  get isOtherPortalsSelected() {
    return this.redemptionForm.get('fld_RedemptionId')?.value == 3;
  }

  get isPointsRebateSelected() {
    return this.rewardForm.get('fld_RewardId')?.value == 3;
  }

  get isFixedPointsSelected() {
    return this.rewardForm.get('fld_RewardId')?.value == 2;
  }

  ngAfterContentChecked() {
    this.ref.detectChanges();
  }

  decoySubmit() {
    this.redemptionForm.markAllAsTouched();
    this.rewardForm.markAllAsTouched();
  }

  intialSavingForm() {
    this.formSubmitAttempt = true;
    if (this.rewardForm.valid && this.redemptionForm.valid) {
      this.setSubmitButton(false);
      this.formSubmitAttempt = false;
      this.store.dispatch(
        new saveRewardsRedemptionsInfoForm({
          ...this.redemptionForm.value,
          fld_CampaignId: this.fldCampaignId,
          fld_CodeEntryId: this.fldCodeEntryId,
        })
      );
      this.store.dispatch(
        new saveRewardsPointsInfoForm({
          ...this.rewardForm.value,
          fldCampaignId: this.fldCampaignId,
        })
      );
      this.rewardsFormValue.emit({
        rewardRedemptionPayload: {
          ...this.redemptionForm.value,
          fld_CampaignId: this.fldCampaignId,
          fld_CodeEntryId: this.fldCodeEntryId,
        },
        rewardPointsPayload: {
          ...this.rewardForm.value,
          fld_CampaignId: this.fldCampaignId,
        },
        'form-type': REWARDS_FORM,
        fldCampaignId: this.fldCampaignId,
      });
    }
  }

  saveForm() {
    // this.audiencePayload.forEach((object: any) => {
    //   delete object['audience_name'], delete object['file'];
    // });
    const audienceList = this.audiencePayload.map(
      (item: { audience_value: any }) => item.audience_value
    );
    console.log(audienceList);
    this.formSubmitAttempt = true;
    if (this.rewardForm.valid && this.redemptionForm.valid) {
      this.setSubmitButton(false);
      this.campaignFormValue.emit({
        createCampaignPayload: {
          audienceIdList: audienceList,
          campaignName: this.campaignPayload['fld_CampaignName'],
          startDate: this.campaignPayload['fld_StartDate'],
          endDate: this.campaignPayload['fld_EndDate'],
          codeEntryId: this.fldCodeEntryId,
          redemptionId: this.redemptionForm.get('fld_RedemptionId')?.value,
          pointsRebate: parseFloat(
            this.rewardForm.get('fld_PointsRebate')?.value
          ),
          values: this.uploadedFile,
          limitationId: this.limitationPayload['fld_LimitationId'],
          rewardId: this.rewardForm.get('fld_RewardId')?.value,
          createdBy: 'User1',
          deletedBy: 'User2',
          minimumAmount: parseFloat(
            this.limitationPayload['minimum_principal']
              .toString()
              .replace(/,/g, '')
          ),
          transactionId: this.typesPayload['fld_TransactionId'],
          fileName: this.audienceFileNamePayload,
          isDeleted: 0,
          codeEntryValue: this.redemptionForm.get('fld_Value')?.value,
          isStatus: 2,
          fixedPoints: parseFloat(
            this.rewardForm.get('fld_FixedPoints')?.value
          ),
        },
        'form-type': FINAL_CAMPAIGN_FORM,
      });
    }
  }

  isThisRedemptionSelected(value: number) {
    return this.redemptionForm.get('fld_RedemptionId')?.value == value;
  }

  isThisRewardSelected(value: number) {
    return this.rewardForm.get('fld_RewardId')?.value == value;
  }

  cancelEdit() {
    this.router.navigate([`/campaigns/campaign-detail/${this.fldCampaignId}`],{
      queryParams: {
        UserID: this.userId,
        Name: this.name,
      }
    });
  }

  ngOnDestroy() {
    this.destroy$.next(null);
  }
}
