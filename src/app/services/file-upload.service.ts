import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class FileUploadService {

  url = environment.apiURL;

  constructor(private http:HttpClient) {

   }

   fileUpload(payload:FormData){
      return this.http.post(`${this.url}/api/FileUpload/upload`,payload)
   }
}
