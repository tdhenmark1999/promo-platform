import { RewardsRedemptionPayload } from './../models/campaign_info.model';
export class getAllRedemptions {
    static readonly type = '[ Get All Redemptions ] Get Redemptions List'
}

export class createRedemptionReward {
    static readonly type = '[ createRedemptionReward ] Create Redemption Reward Info';
    constructor(public payload: RewardsRedemptionPayload){}
}

export class getRedemptionInfo{
    static readonly type = '[ getRedemptionInfo ] Get Redemption Info';
    constructor(public id: any) {}
}

export class updateRedemptionReward{
    static readonly type = '[ updateRedemptionReward ] Update Redemption Reward';
    constructor(public payload: RewardsRedemptionPayload){}
}