import { Routes } from '@angular/router';


export const publicRoutes:Routes = [
        {
            path:'',
            loadChildren:() => import('../components/auth/auth.module').then((m)=>m.AuthModule)
        }
]