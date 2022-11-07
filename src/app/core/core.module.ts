import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { Injectable, NgModule } from '@angular/core';
import { NGXS_PLUGINS, NgxsModule } from '@ngxs/store';
import { NbDialogModule, NbDialogRef, NbDialogService } from '@nebular/theme';
import { NgbActiveModal, NgbModule } from '@ng-bootstrap/ng-bootstrap';
import {
  ServiceWorkerModule,
  SwRegistrationOptions,
} from '@angular/service-worker';

import { AlertProvider } from './providers/alert.provider';
import { AuthState } from '../../app/components/auth/store/auth.state';
import { BrowserModule } from '@angular/platform-browser';
import { CampaignState } from 'src/app/core/store/camapaign.state';
import { DashboardState } from './store/dashboard.state';
import { HttpRequestInterceptor } from './http-request-interceptors/http-request-interceptor';
import { LoaderComponent } from '../core/shared/components/loader/loader.component';
import { NgxPaginationModule } from 'ngx-pagination';
import { NgxsActionsExecutingModule } from '@ngxs-labs/actions-executing';
import { NgxsLoggerPluginModule } from '@ngxs/logger-plugin';
import { NgxsReduxDevtoolsPluginModule } from '@ngxs/devtools-plugin';
import { NgxsRouterPluginModule } from '@ngxs/router-plugin';
import { NgxsStoragePluginModule } from '@ngxs/storage-plugin';
import { environment } from 'src/environments/environment';
import { logoutPlugin } from './plugins/logout.plugin';

const STATES = [AuthState];
@NgModule({
  imports: [
    HttpClientModule,
    ServiceWorkerModule,
    ServiceWorkerModule.register('ngsw-worker.js', {
      enabled: environment.production,
    }),
    NgxsModule.forRoot([AuthState,DashboardState]),
    NgxsStoragePluginModule.forRoot({
      key: ['auth.encrypted_UserID','auth.encrypted_Name','auth.token'],
    }),
    BrowserModule,
    NgxsStoragePluginModule,
    NgxsLoggerPluginModule,
    NbDialogModule.forRoot(),
    NgxsLoggerPluginModule.forRoot({
      disabled: environment.production,
    }),
    NgxsRouterPluginModule.forRoot(),
    NgxsReduxDevtoolsPluginModule.forRoot({ disabled: environment.production }),
    NgxsActionsExecutingModule.forRoot(),
    NgxPaginationModule,
  ],
  providers: [
    AlertProvider,
    NgbActiveModal,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: HttpRequestInterceptor,
      multi: true,
    },
    {
      provide: SwRegistrationOptions,
      useFactory: () => ({ enabled: environment.production }),
    },

    {
      provide: NGXS_PLUGINS,
      useValue: logoutPlugin,
      multi: true,
    },
  ],
  declarations: [LoaderComponent],
  exports: [LoaderComponent],
})
export class CoreModule {}
