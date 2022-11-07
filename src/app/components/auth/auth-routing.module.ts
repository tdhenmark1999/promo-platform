import { LoginComponent } from '../auth/login/login.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';

 const authRoutes:Routes = [
    {
      path:'login',
      component:LoginComponent
    }
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(authRoutes),
  ],
  exports:[RouterModule]
})
export class AuthRoutingModule { }
