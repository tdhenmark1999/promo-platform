export interface Dashboard {
  fld_CampaignId: number;
  fld_CampaignName: string;
  fld_StartDate: string;
  fld_EndDate: string;
  fld_DateCreated: string;
  fld_IsStatus: string;
  fld_isDeleted: string;
  fld_TransactionType: string;
}

export class DashboardStateModel {
  dashboard_data!: Dashboard | undefined;
  dashboard_datas!: Dashboard[];
  isDashboardLoading!: any;
  totalPages!: number | any;
  itemsPerPage!: number | any;
  currentPage!: number | any;
  searchText!: string | any;
  pageSize:any;
  isDashboardPerPageLoading!: any;
  numberOfRecords!: number | any;
  isCampaignTableEmpty!: boolean | any;
  search!: string | any;
  service!: string | any;
  status!: number | any;
}
