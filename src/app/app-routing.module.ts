import { RouterModule, Routes } from '@angular/router';

import { BlankComponent } from './layouts/blank/blank.component';
import { FullComponent } from './layouts/full/full.component';
import { NgModule } from '@angular/core';
import { privateRoutes } from '../app/routes/private-layout.routes';
import { publicRoutes } from './routes/public-layout.routes';

export const appRoutes: Routes = [
  {
    path: '',
    redirectTo: 'campaigns/campaign-dashboard',
    pathMatch: 'full',
  },
  {
    path: '',
    component: FullComponent,
    children: privateRoutes,
  },
  {
    path: '',
    component: BlankComponent,
    children: publicRoutes,
  },
  {
    path: '**',
    redirectTo: '/not-found',
  },
];

@NgModule({
  exports: [RouterModule],
})
export class AppRoutingModule {}
