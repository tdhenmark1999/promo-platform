export interface RedemptionsModel {
    fld_RedemptionId: number;
    fld_Redemption: string;
    fld_DateCreated: string;
    fld_DateUpdated: string;
    fld_DateDeleted: string;
    fld_IsActive: number;
    fld_CreatedBy: string;
    fld_DeletedBy: string;
}

export class RedemptionsStateModel {
    redemption!: RedemptionsModel | undefined;
    redemptions:RedemptionsModel[] | undefined;
}