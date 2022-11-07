import { ActivatedRoute, ActivatedRouteSnapshot, Router } from '@angular/router';
import { saveEncryptedData, validateInformation } from './components/auth/store/auth.action';

import { AuthState } from 'src/app/components/auth/store/auth.state';
import { Component } from '@angular/core';
import { HttpParams } from '@angular/common/http';
import { Store } from '@ngxs/store';
import { User } from './core/models/auth.model';
import { environment } from './../environments/environment';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  [x: string]: any;

  loginUrl = environment.loginUrl;
  UserId!: string;
  Name!: string;
  token = this.store.selectSnapshot(AuthState.getAccessToken)

  constructor(private route:ActivatedRoute,private router:Router,private store:Store,){
   
  }

  ngOnInit():void{

  }

}
