import { CampaignInfoPayload, SaveRulesPayload } from './../models/campaign_info.model';

export class saveCampaignInfoForm {
    static readonly type = '[ Save Campaign Info Form on State ] Save Campaign Info';
    constructor(public payload:any){}
}

export class saveAudienceInfoForm {
    static readonly type = '[ Save Audience Info Form on State ] Save Audience Info';
    constructor(public payload:any){}
}

export class saveLimitationInfoForm {
    static readonly type = '[ Save Limitation Info Form on State ] Save Limitation Info';
    constructor(public payload: any){}
}

export class saveRulesInfoForm {
    static readonly type = '[ Save Rules Info Form on State ] Save Rules Info';
    constructor(public payload:any){}
}

export class saveRewardsForm {
    static readonly type = '[ Save Rewards State ] Save Rewards From State';
    constructor(public payload:any){}
}

export class saveRewardsRedemptionsInfoForm {
    static readonly type = '[ Save Save Rewards Redemptions Info Form on State ] Save Rewards Redemption Info';
    constructor(public payload:any){}
}

export class saveRewardsPointsInfoForm {
    static readonly type = '[ Save Save Rewards Points Info Form on State ] Save Rewards Points Info';
    constructor(public payload:any){}
}

export class saveRulesLimitationsForm {
    static readonly type = '[ Save  Rules Limitations Info Form on State ] Save Limitation Points Info';
    constructor(public payload:any){}    
}

export class saveRulesTypesForm {
    static readonly type = '[ Save  Rules Types Info Form on State ] Save Types  Info';
    constructor(public payload:any){}    
}

export class saveFileAudienceFileForm {
    static readonly type = '[ Save  Audience File Info Form on State ] Save Audience File  Info';
    constructor(public payload:any){}   
}

export class saveFileAudienceFileNameForm {
    static readonly type = '[ Save  Audience File Info Form Name on State ] Save Audience File Name  Info';
    constructor(public payload:any){}   
}
/**
 *  Api Calls 
 */

export class GetAllCampaignInfo {
    static readonly type = '[ getCampaignInfo ] Get Campaign Info List';
    constructor(){}
}

export class createCampaignInfo {
    static readonly type = '[ createCampaignInfo ] Create Campaign Info';
    constructor( public payload: CampaignInfoPayload){}
}

export class createCampaignOneSubmission {
    static readonly type = '[ createCampaignOneSubmission ] Create Campaign Info  One Submission';
    constructor( public payload: any){}  
}

export class getCampaignInfo {
    static readonly type = '[ getCampaignInfo ] Get Campaign Info';
    constructor(public id:number){}
}

export class deleteCampaignInfo {
    static readonly type = '[ deleteCampaignInfo ] Delete Campaign Info';
    constructor(public id:number){}   
}

export class resetCampaignInfoState  {
    static readonly type = '[ resetCampaignInfoState ] Reset Campaign Info';
}

export class resetFileUploadAudiencePayload {
    static readonly type = '[ resetFileUploadAudiencePayload ] Reset File Audience Info';
}

export class resetFileNameAudiencePayload {
    static readonly type = '[ resetFileNameAudiencePayload ] Reset FileName Audience Info';
}

export class editCampaignInfo {
    static readonly type = '[ editCampaignInfo ] Edit Campaign Info';
    constructor(public payload:CampaignInfoPayload){}   
}

export class LeaveCampaign {
    static readonly type = '[ LeaveCampaign ] LeaveCampaign';
    constructor(){}   
}
