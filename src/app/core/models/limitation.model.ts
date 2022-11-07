export interface LimitationModel {
    fld_LimitationId: number,
    fld_Limitation: string,
    fld_DateCreated: Date,
    fld_DateUpdated: Date,
    fld_DateDeleted: Date,
    fld_IsActive: boolean,
    fld_CreatedBy: string,
    fld_DeletedBy: string
}

export class LimitationStateModel {
    limitation: LimitationModel | undefined;
    limitations!: LimitationModel[];
}