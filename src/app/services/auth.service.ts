import { Observable, of } from 'rxjs';

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from './../core/models/auth.model';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  url = environment.apiURL;


  constructor(private http:HttpClient) { }


  logout():Observable<null>{
    localStorage.clear();
    return of(null);
  }

  validateInformation(payload:User){
      return this.http.post(`${this.url}/api/MyAccess/info`,payload)
  }


}
