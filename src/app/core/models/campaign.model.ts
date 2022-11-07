export interface CampaignInfo {
    fld_CampaignId: number;
    fld_CampaignName: string;
    fld_StartDate: string;
    fld_EndDate: string;
    fld_DateCreated: string;
    fld_DateUpdated:string;
    fld_IsDeleted: number;
    fld_DeletedBy: string;
    fld_CreatedBy:string;
}

export class CampaignInfoStateModel {
  campaign_info: CampaignInfo | undefined;
  campaign_infos: CampaignInfo[] | undefined;
  isCampainInfoIdLoading:any;
}
