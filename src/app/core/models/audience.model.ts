export interface AudienceModel {
    Id:string;
    fId_Audience:string;
    fId_DateCreated:string;
    fId_DateUpdated:string;
    fId_DateDeleted:string;
    fId_IsActive:string;
    fId_CreatedBy:string;
    fId_DeletedBy:string;
}



export class AudienceStateModel {
    audience!: AudienceModel | undefined;
    audiences: AudienceModel[] | undefined;
}