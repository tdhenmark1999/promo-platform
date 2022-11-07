import { AudienceInfoPayload } from "../models/campaign_info.model";

export class GetAllAudience {
    static readonly type = '[ Get All Audience ] Get Audience List';
    constructor(){}
}

export class getAudienceInfo {
    static readonly type = '[ getAudienceInfo ] Get Audience Info';
    constructor(public id: any){}
}

export class updateAudience{
    static readonly type = '[ updateAudience ] Update Audience';
    constructor(
        public payload: any,
        public campaignId: any,
        public isFileUpdated: boolean
    ){}
}

export class updateAudienceFile{
    static readonly type = '[ updateAudienceFile ] Update Audience File';
    constructor(public payload: any){}
}