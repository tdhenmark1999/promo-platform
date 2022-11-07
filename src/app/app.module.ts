import { AppRoutingModule, appRoutes } from './app-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {
  NbCardModule,
  NbDatepickerModule,
  NbLayoutModule,
  NbSelectModule,
  NbThemeModule
} from '@nebular/theme';
import { NgbActiveModal, NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { AlertComponent } from './layouts/alert/alert.component';
import { AppComponent } from './app.component';
import { AuthGuard } from './core/guards/auth-guard.service';
import { BlankComponent } from './layouts/blank/blank.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { CoreModule } from './core/core.module';
import { DeleteCampaignDashboardModalComponent } from './components/delete-campaign-dashboard-modal/delete-campaign-dashboard-modal.component';
import { FullComponent } from './layouts/full/full.component';
import { HeaderComponent } from './layouts/header/header.component';
import { HttpClientModule } from '@angular/common/http';
import { NbEvaIconsModule } from '@nebular/eva-icons';
import { NgModule } from '@angular/core';
import { NgxPaginationModule } from 'ngx-pagination';
import { NgxsSelectSnapshotModule } from '@ngxs-labs/select-snapshot';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { RouterModule } from '@angular/router';

@NgModule({

  imports: [
    CoreModule,
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    NgxPaginationModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    NgbModule,
    NbCardModule,
    NbLayoutModule,
    NbThemeModule.forRoot(),
    BrowserAnimationsModule,
    NbThemeModule.forRoot({ name: 'default' }),
    NbEvaIconsModule,
    NbSelectModule,
    RouterModule.forRoot(appRoutes),
    NbDatepickerModule.forRoot(),
    CommonModule,
    NgxsSelectSnapshotModule.forRoot()

  ],
  providers: [AuthGuard],
  bootstrap: [AppComponent],
  declarations: [
    NotFoundComponent,
    FullComponent,
    BlankComponent,
    AppComponent,
    HeaderComponent,
    AlertComponent,
    DeleteCampaignDashboardModalComponent,
  ],
  exports: [RouterModule],

})
export class AppModule { }
