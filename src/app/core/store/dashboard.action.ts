export class getAllDashboardData {
  static readonly type = '[ Get All Dashboard Data ] Get All Dashboard Data';
  constructor() {}
}

export class getDashboardDataPerPage {
  static readonly type = '[ Get Dashboard Data Per Page ] Get Dashboard Data Per Page';
    constructor(
      public search: string,
      public pageNumber: string,
      public status: number,
      public service: string
    ){}
}

export class DeleteDashboardData {
    static readonly type = '[ Delete Dashboard Data ] DeleteDashboardData';
    constructor(
        public id:number
    ){}
}
