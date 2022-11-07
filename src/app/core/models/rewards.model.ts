export interface Rewards {
  fld_RewardId: number;
  fld_Reward: string;
  fld_DateCreated: string;
  fld_DateUpdated: string;
  fld_DateDeleted: string;
  fld_IsActive: string;
  fld_CreatedBy: string;
  fId_DeleteBy: string;
}
export class RewardsStateModel {
  reward!: Rewards | undefined;
  rewards: Rewards[] | undefined;
}
