import { RulesLimitationsPayload } from './../models/campaign_info.model';

export class GetAllLimitation {
    static readonly type = '[Get All Limitation] Get Limitation List';
}

export class createLimitationInfo {
    static readonly type = '[ createLimitationInfo ] Create Rules Limitation Info';
    constructor(public payload: RulesLimitationsPayload){}
}

export class getLimitationInfo {
    static readonly type = '[ getLimitationInfo ] Get Limitation Info';
    constructor(public id: any) {}
}

export class updateLimitation{
    static readonly type = '[ updateLimitation ] Update Limitation';
    constructor(public payload: RulesLimitationsPayload) {}
}