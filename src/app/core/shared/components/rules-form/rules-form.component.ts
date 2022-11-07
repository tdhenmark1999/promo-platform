import { saveRulesLimitationsForm, saveRulesTypesForm } from './../../../store/campaign.actions';
import { Component, Input, OnInit, AfterContentChecked, ChangeDetectorRef, Output, EventEmitter, ɵɵsetComponentScope } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngxs/store';
import { RULES_FORM } from 'src/app/core/constant/form.constants';
import { DecimalPipe } from '@angular/common';
import { saveRulesInfoForm } from 'src/app/core/store/campaign.actions';
import { Router } from '@angular/router';
import { AuthState } from 'src/app/components/auth/store/auth.state';

@Component({
  selector: 'app-rules-form',
  templateUrl: './rules-form.component.html',
  styleUrls: ['./rules-form.component.scss'],
  providers: [DecimalPipe]
})
export class RulesFormComponent implements OnInit {

  //@Input() transactionType:any;
  @Input() limitation:any;
  @Input() type:any;
  @Input() limitations:any;
  @Input() types: any;
  @Input() fldCampaignId:any;
  @Input() mode!: string;
  @Output() rulesFormValue = new EventEmitter<any>();
  @Output() updateRulesFormValue = new EventEmitter<any>();
  formType = RULES_FORM;

  rulesInfoForm!: FormGroup;
  transactionTypeForm!: FormGroup;
  limitationsForm!: FormGroup;
  submitAttemp = false;
  formSubmitAttempt = false;
  submitButtonStatus = true;
  campaignLimitationId = 0;
  campaignTransactionId = 0;
  userId = this.store.selectSnapshot(AuthState.getEncryptedUserId);
  name = this.store.selectSnapshot(AuthState.getEncryptedName);

  constructor(
    private fb: FormBuilder,
    private ref: ChangeDetectorRef,
    private store: Store,
    private decimalPipe: DecimalPipe,
    private router: Router
  ) {
    this.transactionTypeForm = this.fb.group({
      fld_TransactionId: ['', Validators.required],
    })
    this.limitationsForm = this.fb.group({
      fld_LimitationId: ['', Validators.required],
      minimum_principal: [0]
    })
  }

  ngOnInit(): void {
    if(this.mode == "edit")
      this.setValuesOfForms();
  }

  ngOnChanges(){
    if(this.mode == "edit")
      this.setValuesOfForms();
  }

  setValuesOfForms(){
    if(this.type){
      this.transactionTypeForm.patchValue({
        ...this.type
      });
      this.campaignTransactionId = this.type.fld_CampaignTransactionId;
    }
    if(this.limitation){
      this.limitationsForm.patchValue({
        ...this.limitation,
        minimum_principal: this.limitation.fld_MinimumAmount
      });
      this.campaignLimitationId = this.limitation.fld_CampaignLimitationId;
      //set validation on minimum principal
      this.onLimitationsChange(this.limitation.fld_LimitationId)
    }
  }

  initialSavingForm() {
    this.formSubmitAttempt = true;
    if(this.transactionTypeForm.valid && this.limitationsForm.valid) {
      this.setSubmitButton(false);
      this.formSubmitAttempt = false;
      this.store.dispatch(new saveRulesLimitationsForm(this.limitationsForm.value));
      this.store.dispatch(new saveRulesTypesForm(this.transactionTypeForm.value))
      this.rulesFormValue.emit({
          rulesLimitationsPayload:{
              ...this.limitationsForm.value , fld_CampaignId:this.fldCampaignId
          },
          rulesTypesPayload:{
            ...this.transactionTypeForm.value , fld_CampaignId:this.fldCampaignId
          },
          'form-type': RULES_FORM
      })
    }
  }

  updateForm(){
    if(this.transactionTypeForm.valid && this.limitationsForm.valid){
      this.updateRulesFormValue.emit({
        rulesTypesPayload:{
          fld_TransactionId: this.transactionTypeForm
            .get('fld_TransactionId')?.value,
          fld_CampaignId: +this.fldCampaignId,
          fld_CampaignTransactionId: this.campaignTransactionId
        },
        rulesLimitationsPayload:{
          fld_CampaignId: +this.fldCampaignId,
          fld_MinimumAmount: parseFloat(
            this.limitationsForm
            .get('minimum_principal')?.value
            .toString()
            .replace(/,/g, '')
          ),
          fld_LimitationId:this.limitationsForm
            .get('fld_LimitationId')?.value,
          fld_CampaignLimitationId: this.campaignLimitationId
        },
        formPayload:{
          'form-type': 'Rules',
        }

      })
    }
  }

  setSubmitButton(flag: boolean) {
    this.submitButtonStatus = flag;
  }

  decoySubmit(){
    this.transactionTypeForm.markAllAsTouched();
    this.limitationsForm.markAllAsTouched();
  }

  submitForm(){
    this.submitAttemp = true;
  }

  //Validation Errors
  get errorInTransaction(){
    return (!this.transactionTypeForm.valid && this.transactionTypeForm.touched) 
  }

  get errorInLimitationForm(){
    return (!this.limitationsForm.valid && this.limitationsForm.touched);
  }

  convertCurrencyFormat(){
    if(this.limitationsForm.get('minimum_principal')?.valid){
      let minimumPrincipalValue = this.limitationsForm.get('minimum_principal')?.value;
      //Removes misplaced commas
      const valueString: string = minimumPrincipalValue.toString();
      minimumPrincipalValue = +(valueString.split(',').join(''));
      //Sets the value in a currency format
      this.limitationsForm.get('minimum_principal')?.setValue(
        this.decimalPipe.transform(
          minimumPrincipalValue, '1.2-2'
        )
      );
    }
  }


  onTransactionTypeChange(transactionTypeValue: number){
    //const transactionTypeValue = this.transactionTypeForm.get('transaction_type')?.value; 
    // get showing wrong value...

    //unchecks minimum principal
    if(transactionTypeValue == 1 && this.isMininmumPrincipalSelected){
      this.limitationsForm.get('fld_LimitationId')?.setValue('');
      this.limitationsForm.get('minimum_principal')?.setValue(0);
    }

  }

  onLimitationsChange(limitationValue: number){
    //add validation to minimum principal input form
    if(limitationValue == 5){
      this.limitationsForm.get('minimum_principal')?.
        addValidators([Validators.required,
        Validators.pattern('^[0-9,]+(.[0-9]{1,2})?$')]);
    }
    else{
      this.limitationsForm.get('minimum_principal')?.clearValidators();
      this.limitationsForm.get('minimum_principal')?.updateValueAndValidity();
      this.limitationsForm.get('minimum_principal')?.setValue(0);
    }
  }

  ngAfterContentChecked() {
    this.ref.detectChanges();
  }

  get isMininmumPrincipalSelected(){
    return this.limitationsForm.get('fld_LimitationId')?.value == 5;
  }

  get isPawningSelected(){
    return this.transactionTypeForm.get('fld_TransactionId')?.value == 1;
  }

  isThisTypeSelected(value: number){
    return this.transactionTypeForm.get('fld_TransactionId')?.value == value;
  }
  isThisLimitationSelected(value: number){
    return this.limitationsForm.get('fld_LimitationId')?.value == value;
  }

  cancelEdit(){
    this.router.navigate([`/campaigns/campaign-detail/${this.fldCampaignId}`],{
      queryParams: {
        UserID: this.userId,
        Name: this.name,
      }
    });
  }

}
