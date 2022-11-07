import { RulesTypesPayload } from './../models/campaign_info.model';

export class getAllTypes {
  static readonly type = '[ Get All Types ] Get Types List';
}

export class createTypeInfo {
  static readonly type = '[ createTypeInfo ] Create Rules Type Info';
  constructor(public payload: RulesTypesPayload) {}
}

export class getTransactionTypeInfo {
  static readonly type = '[ getTransactionTypeInfo ] Get Transaction Type Info';
  constructor(public id: any) {}
}

export class updateRulesType{
  static readonly type = '[ updateRulesType ] Update Rules Type';
  constructor(public payload: RulesTypesPayload) {}
}
