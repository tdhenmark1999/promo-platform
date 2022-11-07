import { RewardsPointsPayload } from './../models/campaign_info.model';
export class getAllRewards {
    static readonly type = '[ Get All Rewards ] Get Rewards List';
    constructor(){}
}

export class createRewardPoints {
    static readonly type = '[ createRewardPoints ] Create Reward Points';
    constructor(public payload:RewardsPointsPayload){}
}

export class getRewardInfo {
    static readonly type = '[ getRewardInfo ] Get Reward Info';
    constructor(public id: any) {}
}

export class updateRewardPoints{
    static readonly type = '[ updateRewardPoints ] Update Reward Points';
    constructor(public payload:RewardsPointsPayload){}
}