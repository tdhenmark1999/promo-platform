import {
  ActivatedRouteSnapshot,
  CanActivate,
} from '@angular/router';

import { AuthState } from '../../components/auth/store/auth.state';
import { Injectable } from '@angular/core';
import { Store } from '@ngxs/store';
import { User } from '../models/auth.model';
import { environment } from 'src/environments/environment';
import { validateInformation } from './../../components/auth/store/auth.action';

// NGXS

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  loginUrl = environment.loginUrl;
  token = this.store.selectSnapshot(AuthState.getAccessToken);
  constructor(private store: Store) {}

  canActivate(route: ActivatedRouteSnapshot) {
    const data: User = {UserID: route.queryParams['UserID'], Name: route.queryParams['Name'] };
    if ((data.Name === null || !data.Name || data.Name == undefined) &&(data.UserID === null || !data.UserID || data.UserID == undefined) &&( this.token === undefined || !this.token)) {
      this.store.dispatch(new validateInformation(data));
      return false;
    } else {
      this.store.dispatch(new validateInformation(data));
      return true;
    }
  }

  
}
