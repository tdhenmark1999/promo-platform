import { ActivatedRoute, Router } from '@angular/router';
import { Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Observable, Subject, catchError, takeUntil } from 'rxjs';
import { Select, Store } from '@ngxs/store';
import {
  resetFileNameAudiencePayload,
  resetFileUploadAudiencePayload,
  saveAudienceInfoForm,
  saveFileAudienceFileForm,
  saveFileAudienceFileNameForm,
} from '../../../store/campaign.actions';

import { AudienceModel } from 'src/app/core/models/audience.model';
import { AudienceState } from 'src/app/core/store/audience.state';
import { GetAllAudience } from './../../../store/audience.action';
import Swal from 'sweetalert2';
import { AuthState } from 'src/app/components/auth/store/auth.state';

@Component({
  selector: 'app-audience-form',
  templateUrl: './audience-form.component.html',
  styleUrls: ['./audience-form.component.scss'],
})
export class AudienceFormComponent implements OnInit{
  
  @Input() mode:any;
  @Select(AudienceState.getAllAudiences)
  audience$!: Observable<AudienceModel[]>;
  audienceForm!: FormGroup;
  isChecked = false;
  selectedAudience: any = [];
  isExportFile = false;
  private destroy$ = new Subject();
  selectedFile!: any;
  @ViewChild('fileInput') fileIputElement!: ElementRef;
  audienceList : AudienceModel[] | any;
  submitButtonStatus = true;
  formSubmitAttempt = false;
  isAudienceFormDirty = false;
  //Update vars
  @Input() audienceValues: any;
  @Input() fldCampaignId!: number;
  @Input() audienceFileValues!: any;
  @Input() audienceFileName!: any;
  triggeredOnce = false;
  isFileDecoy = false;
  fileDecoyValue = "";
  @Output() audienceFormValue = new EventEmitter<any>();
  userId = this.store.selectSnapshot(AuthState.getEncryptedUserId);
  name = this.store.selectSnapshot(AuthState.getEncryptedName);

  constructor(
    private fb: FormBuilder,
    private store: Store,
    private router: Router
  ) {
    if(this.mode) {
        this.audienceForm.markAsDirty();
    }
    this.audienceForm = this.fb.group({
      audience_list: this.fb.array([])
    });
    this.store
      .dispatch(new GetAllAudience())
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (data) => {
          this.audienceList = data['audience']['audiences'];
          const audienceRows = this.audienceForm.get(
            'audience_list'
          ) as FormArray;
          this.audienceList.forEach((data: any) => {
            audienceRows.push(
              this.fb.group({
                audience_name: data.fld_Audience,
                audience_value: data.fld_AudienceId,
                file: ['', Validators.required],
              })
            );
          });
        },
        complete: () => {
         if(this.mode == 'edit')
          this.setValuesOfForms();
        }
      })
  }
  
  ngOnInit(): void {}

  ngOnChanges(){
    if(this.mode == "edit" && this.audienceList)
      this.setValuesOfForms();
  }

  setValuesOfForms(){
    if(this.audienceValues && !this.triggeredOnce){
      //Cehck if there is file then set the inputbox
      const fileObj = this.audienceValues.find((obj:any) =>  obj.fld_Path)
      if(fileObj){
        this.fileDecoyValue = fileObj.fld_Path;
        this.isFileDecoy = true;
        this.selectedFile = fileObj.fld_Path;
      }
      //Remove all the file container instance
      this.audienceValues = this.audienceValues.filter(
        (item: any) =>  item.fld_CampaignId != 0
      );
      //Set the Checkboxes value
      const formControls = this.audienceFormGroup.controls;
      this.audienceValues.forEach((data: any) => {
        data.fld_Audience
        let index = formControls.findIndex(
          obj => obj.value.audience_value === data.fld_AudienceId
        );
        if(index >= 0) this.onChecked(true, formControls[index], 0);
      });
      this.triggeredOnce = true;
      
    }
  }

  updateAudienceForm(){
    this.audienceValues = this.audienceValues.filter(
      (item: any) =>  item.fld_CampaignId != 0
    );
    let payloadAudienceList = this.audienceValues.map(
      (item: any) => {
        const newObj = {}
        newObj['fld_CampaignAudienceId']= item.fld_CampaignAudienceId;
        newObj['fld_AudienceId']= item.fld_AudienceId;
        newObj['fld_CampaignId']= item.fld_CampaignId;
        const isExist = this.selectedAudience.some((x:any) => x.audience_value == item.fld_AudienceId);
        if(isExist)
          newObj['fld_IsDeleted']= 0;
        else{
          newObj['fld_IsDeleted']= 1
          newObj['deletedBy'] = 'User2';
        }
        return newObj;
      }
    );
    const campaignId = +this.fldCampaignId;
    this.selectedAudience.forEach(function(item:any){
      const isAudienceExisting = payloadAudienceList.some((x:any) => 
        x.fld_AudienceId == item.audience_value
      );
      if(!isAudienceExisting){
        let newObj = {
          fld_CampaignAudienceId: null,
          fld_AudienceId: item.audience_value,
          fld_CampaignId: campaignId,
          "fld_IsDeleted": 0,
          'fld_CreatedBy': 'User1',
        }
        payloadAudienceList.push(newObj)
      }
    });
    const isFileUpdated = this.selectedFile && !this.isFileDecoy? true: false;
    const filePayload = {
      fld_CampaignId: +this.fldCampaignId,
      createdBy: 'User1',
      isDeleted: 0,
      fld_Values: this.audienceFileValues,
      fld_Path: this.audienceFileName
    };
    this.audienceFormValue.emit({
      formPayload:{
        'form-type': 'Audience',
        audienceListPayload: payloadAudienceList,
        isFileUpdated: isFileUpdated,
        filePayload: filePayload,
        campaignId: +this.fldCampaignId
      }
    })
  }

  get audienceFormGroup() {
    return this.audienceForm.get('audience_list') as FormArray;
  }

  get errorInAudienceForm() {
    return (
      (this.selectedAudience.length == 0 && this.audienceForm.dirty) ||
      (this.isExportFile && this.selectedFile == null)
    );
  }

  setSubmitButton(flag: boolean) {
    this.submitButtonStatus = flag;
  }

  getSubmitButton() {
    return this.submitButtonStatus;
  }

  decoySubmit() {
    this.audienceForm.markAsDirty();
  }

  initialSaveAudienceForm() {
    const formData = new FormData();
    formData.append('file', this.selectedFile);
    this.store.dispatch(new saveAudienceInfoForm(this.selectedAudience));
  }

  onChecked(event: any, row: any, _i: any) {
    const isExist = this.audienceList.some((x: { fld_Audience: any }) => x.fld_Audience === row.value.audience_name);
    if (event == true) {
      const uniqueChars = this.selectedAudience.includes(
        row.value.audience_value
      );
      if (!uniqueChars) {
        this.selectedAudience.push(row.value);
      }
      if (row.value.audience_name === 'Custom Audience') {
        this.isExportFile = true;
      }
    } else if (event == false && isExist) {
      this.removeItem(row.value.audience_value);
      this.isAudienceFormDirty = false;
      this.formSubmitAttempt = false;
      if(row.value.audience_name === 'Custom Audience'){
        this.isExportFile = false;
        if(this.isFileDecoy)
          this.removeDecoyFileValue();
        else this.removeFileItem();
      }

    }
  }

  removeFileItem(){
    this.selectedFile = null;
    this.fileIputElement.nativeElement.value = "";
    this.store.dispatch(new resetFileUploadAudiencePayload());
    this.store.dispatch(new resetFileNameAudiencePayload());
  }

  removeItem(value: string) {
    this.selectedAudience = this.selectedAudience.filter(
      (item: any) => item.audience_value !== value
    );
  }

  removeDecoyFileValue(){
    this.isFileDecoy = false;
    this.selectedFile = null;
  }

  onSelectFile(event: Event, i: any) {
    console.log(event.target?.['files'][0].type);
    if ((event.target?.['files'][0].type === 'text/csv') || ( event.target?.['files'][0].type === 'application/vnd.ms-excel')) {
      this.selectedFile = (event.target as HTMLInputElement)?.files?.[0];
      const formData = new FormData();
      formData.append('file', this.selectedFile);
      this.store.dispatch(new saveFileAudienceFileForm(formData)).subscribe({
        next: () => {
          this.formSubmitAttempt = false;
        },
        error: () => {
          this.formSubmitAttempt = true;
          this.removeFileItem();
        },
      });
      this.store.dispatch(new saveFileAudienceFileNameForm(this.selectedFile['name']))
    } else if (event.target?.['files'][0].type !== 'text/csv') {
      {
        const formArray = this.audienceForm.get('audience_list') as FormArray;
        formArray.at(i).get('file')?.reset();
        Swal.fire('Error', 'File Not Supported', 'error').then(
            () => {
              this.removeFileItem();
          }
        );
      }
    }
  }

  isAudienceChecked(value: number){
    return this.selectedAudience.some(
      function(el: {audience_value: number}){
        return el.audience_value === value;
      });
  }

  cancelEdit(){
    this.router.navigate([`/campaigns/campaign-detail/${this.fldCampaignId}`],{
      queryParams: {
        UserID: this.userId,
        Name: this.name
      }
    })
  }

  ngOnDestroy(): void {
    this.destroy$.next(null);
  }
}
