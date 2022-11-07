import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { RulesTypesPayload } from './../core/models/campaign_info.model';
import { TypesModel } from './../core/models/type.model';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class TypesService {

  url = environment.apiURL

  constructor(private http: HttpClient) { }

  getType() {
    return this.http.get<TypesModel[]>(`${this.url}/api/TransactionTypes/list`);
  }

  createRulesTypes(payload: RulesTypesPayload) {
    return this.http.post(`${this.url}/api/Transactions/create/campaign-rules-types`, payload)
  }

  getTransactionTypeInfo(id:any){
      return this.http.get<TypesModel>(`${this.url}/api/TransactionTypes/list/${id}`)
  }

  updateRulesType(payload: RulesTypesPayload){
    return this.http.put<RulesTypesPayload>(`${this.url}/api/Transactions/edit/campaign-rules-types`, payload);
  }

}
