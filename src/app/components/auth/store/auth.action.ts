import { User } from './../../../core/models/auth.model';

export class Login {
  static readonly type = '[ Login User ] User Login';
  constructor(public payload: any) {}
}

export class Logout {
  static readonly type = '[ Logout User ] Logout';
}

export class saveEncryptedData {
    static readonly type = '[ Save Encrypted Data ] Dara';
    constructor(public payload:any){}
}

export class validateInformation {
  static readonly type = '[ Validate Data ] Validate Data';
  constructor(public payload:any){}
}

