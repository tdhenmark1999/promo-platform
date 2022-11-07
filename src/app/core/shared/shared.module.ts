import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {
  NbButtonModule,
  NbCardModule,
  NbCheckboxModule,
  NbDatepickerModule,
  NbDialogService,
  NbInputModule,
  NbLayoutModule,
  NbRadioModule,
  NbSelectModule,
  NbSpinnerModule,
  NbStepperModule,
  NbThemeModule
} from '@nebular/theme';

import { ActivityLogsState } from './../store/activity_logs.state';
import { AudienceFormComponent } from './components/audience-form/audience-form.component';
import { AudienceState } from '../store/audience.state';
import { CampaignDetailComponent } from './components/campaign-detail/campaign-detail.component';
import { CampaignInfoFormComponent } from './components/campaign-info-form/campaign-info-form.component';
import { CampaignInfoState } from './../store/campaign_info.state';
import { CampaignState } from '../store/camapaign.state';
import { CommonModule } from '@angular/common';
import { ConfirmationModalComponent } from './components/confirmation-modal/confirmation-modal.component';
import { DashboardFilterComponent } from './components/dashboard-filter/dashboard-filter.component';
import { DashboardState } from './../store/dashboard.state';
import { DashboardTableComponent } from './components/dashboard-table/dashboard-table.component';
import { FileState } from '../../core/store/file_upload.state';
import { LeaveCampaignModalComponent } from './components/leave-campaign-modal/leave-campaign-modal.component';
import { LimitationState } from '../store/limitation.state';
import { NbEvaIconsModule } from '@nebular/eva-icons';
import { NgModule } from '@angular/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgxPaginationModule } from 'ngx-pagination';
import { NgxsModule } from '@ngxs/store';
import { PipeModule } from './../../pipes/pipe.module';
import { RedemptionState } from './../store/redemption.state';
import { RewardsFormComponent } from './components/rewards-form/rewards-form.component';
import { RewardsState } from './../store/rewards.state';
import { RulesFormComponent } from './components/rules-form/rules-form.component';
import { TypeState } from '../store/type.state';

const STATES = [
  AudienceState,
  RewardsState,
  CampaignInfoState,
  RedemptionState,
  CampaignInfoState,
  LimitationState,
  TypeState,
  DashboardState
];

export const MODULES = [
  CommonModule,
  NgbModule,
  NbCardModule,
  NbStepperModule,
  NbLayoutModule,
  NbButtonModule,
  NbThemeModule.forRoot(),
  NbDatepickerModule,
  NbThemeModule.forRoot({ name: 'default' }),
  NbEvaIconsModule,
  PipeModule,
  NbSelectModule,
  ReactiveFormsModule,
  FormsModule,
  NbLayoutModule,
  NbCheckboxModule,
  NbRadioModule,
  NbSelectModule,
  NbInputModule,
  NbSpinnerModule,
  NgxPaginationModule,
];

export const COMPONENTS = [
  DashboardTableComponent,
  DashboardFilterComponent,
  CampaignInfoFormComponent,
  AudienceFormComponent,
  RulesFormComponent,
  RewardsFormComponent,
  CampaignDetailComponent,
  ConfirmationModalComponent,
  CampaignInfoFormComponent,
  AudienceFormComponent,
  RulesFormComponent,
  RewardsFormComponent,
];

/**
 *
 *
 * @this where you put the recyclable components
 */

@NgModule({
  declarations: [
    COMPONENTS
  ],
  exports: [MODULES, COMPONENTS],
  
  imports: [
    MODULES,
    NgxsModule.forFeature([
      CampaignInfoState,
      AudienceState,
      RewardsState,
      RedemptionState,
      LimitationState,
      TypeState,
      FileState,
      CampaignState,
      ActivityLogsState
    ]),
  ],
})
export class SharedModule {}
