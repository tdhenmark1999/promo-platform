import { AudienceState } from 'src/app/core/store/audience.state';
import { SharedModule } from './../../core/shared/shared.module';
import { CampaignHistoryComponent } from './campaign-history/campaign-history.component';
import { CampaignDashboardComponent } from '../../components/campaign/campaign-dashboard/campaign-dashboard.component';
import { Router, RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { CreateCampaignComponent } from './create-campaign/create-campaign.component';
import { CampaignDetailsComponent } from './campaign-details/campaign-details.component';
import { NgxsModule } from '@ngxs/store';
import { UpdateCampaignComponent } from './update-campaign/update-campaign.component';
import { CanDeactivateGuard } from 'src/app/core/guards/can-deactivate-guard.service';

const campaignRoutes: Routes = [
  { path: 'campaign-dashboard', component: CampaignDashboardComponent },
  { path: 'campaign-history', component: CampaignHistoryComponent },
  { path: 'create-campaign', component: CreateCampaignComponent, canDeactivate: [CanDeactivateGuard] },
  { path: 'campaign-detail/:id', component: CampaignDetailsComponent},
  { path: 'update-campaign/:id', component: UpdateCampaignComponent },
  {
    path: '',
    redirectTo: '/not-found',
  },
];

@NgModule({
  imports: [RouterModule.forChild(campaignRoutes)],
  exports: [RouterModule],
  providers: [CanDeactivateGuard]
})
export class CampaignRoutingModule {}
