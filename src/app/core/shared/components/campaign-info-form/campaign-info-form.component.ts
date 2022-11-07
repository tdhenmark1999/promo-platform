import * as moment from 'moment';

import {
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
  SimpleChanges,
} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { CAMPAIGN_FORM } from './../../../constant/form.constants';
import { Router } from '@angular/router';
import { Store } from '@ngxs/store';
import { Subject } from 'rxjs';
import {
  saveCampaignInfoForm,
} from '../../../store/campaign.actions';
import { AuthState } from 'src/app/components/auth/store/auth.state';

@Component({
  selector: 'app-campaign-info-form',
  templateUrl: './campaign-info-form.component.html',
  styleUrls: ['./campaign-info-form.component.scss'],
})

export class CampaignInfoFormComponent implements OnInit {
  [x: string]: any;
  DEFAULT_END_DATE_MESSAGE = 'Please select an end date.';
  DEFAULT_START_DATE_MESSAGE = 'Please select a start date.';
  campaignInfoForm!: FormGroup;
  submitButtonStatus = true;
  formSubmitAttempt = false;
  private destroy$ = new Subject<void>();
  @Output() campaignFormValue = new EventEmitter<any>();
  formType = CAMPAIGN_FORM;
  startDateMinValue: any;
  endDateMinValue: string = '';
  isEndDateDisabled = true;
  endDateErrorMessage: string = this.DEFAULT_END_DATE_MESSAGE;
  startDateErrorMessage: string = this.DEFAULT_START_DATE_MESSAGE;
  @Input() campaignInfo: any;
  @Input() mode!: string;
  @Input()
  form_type!: string;
  showNebular: string = '';
  userId = this.store.selectSnapshot(AuthState.getEncryptedUserId);
  name = this.store.selectSnapshot(AuthState.getEncryptedName);
  
  constructor(
    private fb: FormBuilder,
    private store: Store,
    private router: Router
  ) {
    this.campaignInfoForm = this.fb.group({
      fld_CampaignName: [null, [Validators.required, Validators.maxLength(60)]],
      fld_StartDate: [null, Validators.required],
      fld_EndDate: [null, Validators.required],
    });
  }

  ngOnInit(): void {
    if (this.mode === 'edit' && this.campaignInfo) {
      this.campaignInfoForm.patchValue({
        ...this.campaignInfo,fld_StartDate:moment(this.campaignInfo.fld_StartDate).format('yyyy-MM-dd'),
        fld_EndDate:moment(this.campaignInfo.fld_EndDate).format('yyyy-MM-dd'),
      });
      this.isEndDateDisabled = false;
      this.campaignInfoForm.markAllAsTouched();
    }
    this.setValidStartDate();
  }

  ngOnChanges(changes: SimpleChanges) {
    const infoChanges = changes['campaignInfo']?.currentValue;
    if (this.mode === 'edit' && this.campaignInfo) {
      this.campaignInfoForm.patchValue({
        ...infoChanges,fld_StartDate:moment(infoChanges.fld_StartDate).format('YYYY-MM-DD'),
        fld_EndDate:moment(infoChanges.fld_EndDate).format('YYYY-MM-DD'),
      });
      this.isEndDateDisabled = false;
      this.campaignInfoForm.markAllAsTouched();
    }
  }

  get remainingTextAllowed() {
    return this.campaignInfoForm
      .get('fld_CampaignName')
      ?.value.toString()
      .lenth();
  }
  get errorInCampaignName() {
    return (
      !this.campaignInfoForm.get('fld_CampaignName')?.valid &&
      this.campaignInfoForm.get('fld_CampaignName')?.touched
    );
  }
  get errorInStartDate() {
    return (
      !this.campaignInfoForm.get('fld_StartDate')?.valid &&
      this.campaignInfoForm.get('fld_StartDate')?.touched
    );
  }
  get errorInEndDate() {
    return (
      !this.campaignInfoForm.get('fld_EndDate')?.valid &&
      this.campaignInfoForm.get('fld_EndDate')?.touched
    );
  }

  setDateToString(dateParam: string){
    const date = new Date(dateParam);
    const month = date.getMonth() + 1;
    const day = date.getDate();
    let monthString;
    let dayString;
    month < 10 ? monthString = "0" + month: monthString = month;
    day < 10 ? dayString = "0" + day: dayString = day;
    return `${date.getFullYear()}-${monthString}-${dayString}`;
  }

  setValidStartDate() {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    this.startDateMinValue = today.setDate(today.getDate() + 3);
  }

  onDateChange($event: any) {
    const endDate = this.campaignInfoForm.get('fld_EndDate')?.value;
    const startDate = this.campaignInfoForm.get('fld_StartDate')?.value;
    this.endDateMinValue = startDate;

    if (startDate == '') {
      this.startDateErrorMessage = this.DEFAULT_START_DATE_MESSAGE;
      this.isEndDateDisabled = true;
    } else {
      if (Date.parse(startDate) < this.startDateMinValue) {
        this.campaignInfoForm
          .get('fld_StartDate')
          ?.setErrors({ invalid: true });
        this.startDateErrorMessage = 'Please select a valid start date.';
        this.isEndDateDisabled = true;
      } else {
        this.isEndDateDisabled = false;
        if (endDate == '' || endDate == null)
          this.endDateErrorMessage = this.DEFAULT_END_DATE_MESSAGE;
        else {
          if (startDate > endDate) {
            this.campaignInfoForm
              .get('fld_EndDate')
              ?.setErrors({ invalid: true });
            this.endDateErrorMessage = `Please select a date which
              is not earlier than the start date.`;
          } else this.campaignInfoForm.get('fld_EndDate')?.setErrors(null);
        }
      }
    }
  }

  setSubmitButton(flag: boolean) {
    this.submitButtonStatus = flag;
  }

  getSubmitButton() {
    return this.submitButtonStatus;
  }

  decoySubmit() {
    this.campaignInfoForm.markAllAsTouched();
  }

  intialSavingForm() {
    this.formSubmitAttempt = true;
    if (this.campaignInfoForm.valid) {
      this.setSubmitButton(false);
      this.formSubmitAttempt = false;
      this.campaignFormValue.emit({
        payload: this.campaignInfoForm.value,
        'form-type': this.formType,
      });
      this.store.dispatch(
        new saveCampaignInfoForm(this.campaignInfoForm.value)
      );
    }
  }

  updateCampaignInfo() {
    this.formSubmitAttempt = true;
    const formPayload = {
      ...this.campaignInfoForm.value,
      fld_CampaignId: this.campaignInfo['fld_CampaignId'],
      'form-type': 'Campaign',
      fld_IsStatus: 1,
      fld_isDeleted: 0,
    };
    if (this.campaignInfoForm.valid) {
      this.setSubmitButton(false);
      this.formSubmitAttempt = false;
      this.campaignFormValue.emit({ formPayload });
    }
  }

  cancelEdit() {
    this.router.navigate([
      `/campaigns/campaign-detail/${this.campaignInfo['fld_CampaignId']}`,
    ],{
      queryParams: {
        UserID: this.userId,
        Name: this.name,
      }
    });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
  }
}
