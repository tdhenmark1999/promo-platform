import { fileUpload } from './file_upload.actions';
import { FileUploadService } from './../../services/file-upload.service';
import { FileStateModel } from './../models/file.model';
import { Injectable } from "@angular/core";
import { Action, Selector, State, StateContext, Store } from '@ngxs/store';
import { tap, catchError, throwError } from 'rxjs';
import { CampaignPayloadStateModel } from '../models/campaign_info.model';


@State<FileStateModel>({
    name: 'uploaded_file',
    defaults: {
        files: undefined
    },
  })

@Injectable()
export class FileState{

  @Selector()
  getUploadedFile(state:FileStateModel){
      return state.files
  }

  constructor(private uploadService:FileUploadService){

  }

  @Action(fileUpload)
  fileUpload({patchState} : StateContext<CampaignPayloadStateModel>,{payload}:fileUpload){
      return this.uploadService.fileUpload(payload).pipe(
          tap((result:any)=>{
              patchState({
                  file_audience_payload:result['customCampaignAudienceIds']
              }),
              catchError((err)=>{
                return throwError(() => new Error(err));
              })
          })
      )
  }

}