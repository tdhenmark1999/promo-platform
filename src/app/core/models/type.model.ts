export interface TypesModel {
    fld_TransactionId: number,
    fld_TransactionType: string,
    fld_DateCreated: Date,
    fld_DateUpdated: Date,
    fld_DateDeleted: Date,
    fld_IsActive: boolean,
    fld_CreatedBy: string,
    fld_DeletedBy: string
}

export class TypesStateModel {
    type!: TypesModel | undefined;
    types: TypesModel[] | undefined;
}