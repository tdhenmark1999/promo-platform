import { Action, Actions, Select, Selector, State, StateContext, Store } from '@ngxs/store';
import { Login, Logout, saveEncryptedData, validateInformation } from './auth.action';
import { tap, throwError } from 'rxjs';

import { AuthService } from '../../../services/auth.service';
import { Injectable } from '@angular/core';
import { Navigate } from '@ngxs/router-plugin';
import { Router } from '@angular/router';
import { UserInterfaceStateModel } from './../../../core/models/auth.model';
import { catchError } from 'rxjs/operators';
import { environment } from './../../../../environments/environment';

@State<UserInterfaceStateModel>({
    name:'auth',
    defaults:{
        encrypted_UserID:undefined,
        encrypted_Name:undefined,
        decrypted_Name: undefined,
        decrypted_UserID:  undefined,
        token: undefined
    }
})


@Injectable()
export class AuthState {
    
  loginUrl = environment.loginUrl;
  static token: any;


    constructor(private store:Store,private authService:AuthService,private router:Router){}

    @Selector()
    static getEncryptedUserId(state:UserInterfaceStateModel){
        return state.encrypted_UserID
    }

    @Selector()
    static getEncryptedName(state:UserInterfaceStateModel){
        return state.encrypted_Name
    }

    @Selector()
    static getAccessToken(state:UserInterfaceStateModel){
        return state.token
    }

    @Action(saveEncryptedData)
    saveEncryptedData(ctx:StateContext<UserInterfaceStateModel>,{payload} : saveEncryptedData){
        if(payload){
            ctx.patchState({
                encrypted_Name:payload.Name,
                encrypted_UserID:payload.UserID
            })
        } 
    }

    @Action(validateInformation)
    validateInformation({patchState}:StateContext<UserInterfaceStateModel>,{payload}:validateInformation){
        return this.authService.validateInformation(payload).pipe(
            tap((result:any)=> {
                patchState({
                    token:result.accessToken,
                    encrypted_Name:payload.Name,
                    encrypted_UserID:payload.UserID
                })
            }),catchError((err)=>{
                window.location.href = environment.loginUrl;
                return throwError(()=> new Error(err));
            })
        )
    }

    @Action(Logout)
    logout({patchState}:StateContext<any>,{}:Logout){
        return this.authService.logout().pipe(
            tap(()=>{
                this.store.dispatch(new Navigate(['/login']))
            }),
            catchError(err =>{
                return throwError(() => err)
            })
        )
    }
    
}

