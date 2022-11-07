import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Injectable, NgModule } from "@angular/core";
import { NbButtonModule, NbCardModule, NbDatepickerModule, NbDialogModule, NbLayoutModule, NbSelectModule, NbStepperModule, NbThemeModule, NbToastrService } from '@nebular/theme';

import { AlertProvider } from './../../core/providers/alert.provider';
import { AudienceState } from 'src/app/core/store/audience.state';
import { CampaignDashboardComponent } from '../../components/campaign/campaign-dashboard/campaign-dashboard.component';
import { CampaignDetailsComponent } from './campaign-details/campaign-details.component';
import { CampaignHistoryComponent } from './campaign-history/campaign-history.component';
import { CampaignInfoState } from 'src/app/core/store/campaign_info.state';
import { CampaignRoutingModule } from './campaign-routing.module';
import { CommonModule } from '@angular/common';
import { CreateCampaignComponent } from './create-campaign/create-campaign.component';
import { DeleteModalComponent } from '../delete-modal/delete-modal.component';
import { FilterPipeModule } from 'ngx-filter-pipe';
import { LeaveCampaignModalComponent } from 'src/app/core/shared/components/leave-campaign-modal/leave-campaign-modal.component';
import { NbEvaIconsModule } from '@nebular/eva-icons';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { PipeModule } from './../../pipes/pipe.module';
import { SharedModule } from './../../core/shared/shared.module';
import { UpdateCampaignComponent } from './update-campaign/update-campaign.component';

@Injectable()
@NgModule({
    declarations:[
        CampaignDashboardComponent,
        CampaignHistoryComponent,
        DeleteModalComponent,
        CampaignDetailsComponent,
        CreateCampaignComponent,
        CampaignDetailsComponent,
        UpdateCampaignComponent,
        LeaveCampaignModalComponent
    ],
    imports:[
        CampaignRoutingModule,
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        FormsModule,
        FilterPipeModule,
        PipeModule,
        NgbModule,
        NbCardModule,
        NbStepperModule,
        NbButtonModule,
        NbLayoutModule,
        NbThemeModule.forRoot(),
        NbDatepickerModule.forRoot(),
        NbThemeModule.forRoot({ name: 'default' }),
        NbEvaIconsModule,
        NbSelectModule,
        NbDatepickerModule,
        SharedModule,
    ],
    providers:[AlertProvider]
   
})

export class CampaignModule {}