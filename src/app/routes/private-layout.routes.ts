import { AuthGuard } from '../core/guards/auth-guard.service';
import { NotFoundComponent } from './../components/not-found/not-found.component';
import { Routes } from "@angular/router";

export const privateRoutes:Routes = [
    {
        path:'campaigns',
        loadChildren:() => import('../components/campaign/campaign-module').then((m)=>m.CampaignModule),
        canActivate:[AuthGuard]
    },
    
    {
        path:'not-found',
        component:NotFoundComponent
    }     
]