export interface CampaignInfoPayload {
  [x: string]: any;
  fId_CampaignName: string;
  fId_StartDate: string;
  fId_EndDate: string;
}

export interface AudienceInfoPayload {
  audience: string;
  fld_CampaignId:number;
}

export interface SaveRulesPayload {
  redemption: string;
  limitation: string;
}

export interface RewardsRedemptionPayload {
  fld_RedemptionId: string;
  fld_CampaignId: string;
  fld_CodeEntryId: string;
}

export interface RewardsPointsPayload {
  fld_RewardId: number;
  fld_CampaignId: string;
  fld_PointsRebate: number;
}

export interface RulesLimitationsPayload {
  fld_LimitationId:number;
  minimum_principal:number;
  fld_CampaignId:number;
}

export interface RulesTypesPayload {
  fld_TransactionId:number;
  fld_CampaignId:number;
}

export interface FileAudiencePayload {
  customCampaignAudienceIds:any
}
export class CampaignPayloadStateModel {
  campaign_payload!: CampaignInfoPayload | null;
  audience_payload!: AudienceInfoPayload[] | null;
  rules_payload!: SaveRulesPayload | null;
  rewards_redemptions_payload!: RewardsRedemptionPayload | null;
  rewards_points_payload! : RewardsPointsPayload | null;
  rules_limitations_payload!: RulesLimitationsPayload | null;
  rules_types_payload!: RulesTypesPayload | null;
  fld_CampaignId: any | undefined;
  fld_CodeEntryId: any | undefined;
  file_audience_payload!: FileAudiencePayload | null;
  file_name_audience_payload!: string | null;
}
