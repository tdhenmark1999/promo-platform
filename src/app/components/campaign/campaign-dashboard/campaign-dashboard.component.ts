import {
  ActionsExecuting,
  actionsExecuting,
} from '@ngxs-labs/actions-executing';
import { ActivatedRoute, Router } from '@angular/router';
import { Component, Injectable } from '@angular/core';
import { Observable, Subject, takeUntil } from 'rxjs';
import { Select, Store } from '@ngxs/store';
import {
  getAllDashboardData,
  getDashboardDataPerPage,
} from './../../../core/store/dashboard.action';

import { AuthState } from '../../auth/store/auth.state';
import { DashboardState } from './../../../core/store/dashboard.state';

const FILTER_PAG_REGEX = /[^0-9]/g;

@Component({
  selector: 'app-campaign-dashboard',
  templateUrl: './campaign-dashboard.component.html',
  styleUrls: ['./campaign-dashboard.component.scss'],
})
@Injectable()
export class CampaignDashboardComponent {
  @Select(actionsExecuting([getDashboardDataPerPage]))
  isDashboardPerPageLoading$!: Observable<ActionsExecuting>;

  totalPages: any;
  itemsPerPage: any;
  currentPage: any;
  private destroy$ = new Subject();
  page!: string;
  key!: string;
  status!: number;
  service!: string;
  numberOfRecords!: number;
  isCampaignTableEmpty!: boolean;
  isFirstRun!: boolean;
  searchFilter!: string;
  serviceFilter!: string;
  statusFilter!: number;

  userId = this.store.selectSnapshot(AuthState.getEncryptedUserId);
  name = this.store.selectSnapshot(AuthState.getEncryptedName);
  token!: string;
  pageSize: any;

  @Select(DashboardState.getAllDashboardData)
  dashboardData$: Observable<any> | undefined;

  pageTitle: string = '';
  isDashboard = true;

  statusOptions = [
    {
      name: 'All Status',
      value: 0,
    },
    {
      name: 'Active',
      value: 1,
    },
    {
      name: 'Scheduled',
      value: 2,
    },
  ];
  serviceOptions = [
    {
      name: 'All Services',
      value: '',
    },
    {
      name: 'Pawning',
      value: 'Pawning',
    },
    {
      name: 'Domestic Remittance',
      value: 'Domestic Remittance',
    },
  ];

  UserId!: string;
  Name!: string;

  constructor(
    private router: Router,
    private store: Store,
    private route: ActivatedRoute
  ) {
    this.route.queryParams
      .pipe(takeUntil(this.destroy$))
      .subscribe((params) => {
        this.key = params['Search'];
        this.page = params['page'];
        this.service = params['Service'];
        this.status = params['Status'];
        this.store
          .select((state) => state.auth.token)
          .subscribe((token) => {
            if (token) {
              this.store
                .select((state) => state.dashboard.totalPages)
                .subscribe((data) => {
                  this.totalPages = data;
                });
              this.store
                .select((state) => state.dashboard.currentPage)
                .subscribe((data) => {
                  this.currentPage = data;
                });
              this.store
                .select((state) => state.dashboard.itemsPerPage)
                .subscribe((data) => {
                  this.itemsPerPage = data;
                });
              this.store
                .select((state) => state.dashboard.numberOfRecords)
                .subscribe((data) => {
                  this.numberOfRecords = data;
                });
              this.store
                .select((state) => state.dashboard.pageSize)
                .subscribe((data) => {
                  this.pageSize = data;
                });
              this.store
                .select((state) => state.dashboard.search)
                .subscribe((data) => {
                  this.searchFilter = data;
                });
              this.store
                .select((state) => state.dashboard.service)
                .subscribe((data) => {
                  this.serviceFilter = data;
                });
              this.store
                .select((state) => state.dashboard.status)
                .subscribe((data) => {
                  this.statusFilter = data;
                });
              this.store
                .select((state) => state.dashboard.isCampaignTableEmpty)
                .subscribe((data) => {
                  this.isCampaignTableEmpty = data;
                });
              this.store.dispatch(
                new getDashboardDataPerPage(
                  this.key,
                  this.page,
                  this.status,
                  this.service
                )
              );
            }
          });
      });
  }

  formatInput(input: HTMLInputElement) {
    input.value = input.value.replace(FILTER_PAG_REGEX, '');
  }

  ngOnInit() { }

  history() {
    this.router.navigate(['/campaigns/campaign-history']);
  }

  create() {
    this.router.navigate(['/campaigns/create-campaign'], {
      queryParams: {
        mode: 'create',
        UserID: this.userId,
        Name: this.name,
      }
    });
  }

  dashboard() {
    this.router.navigate(['/']);
  }

  pageChange(pageNumber: string) {
    this.router.navigate([`/campaigns/campaign-dashboard`], {
      queryParams: {
        Search: this.key,
        page: pageNumber,
        UserID: this.userId,
        Name: this.name,
        Service: this.service,
        Status: this.status
      }
    });
  }
}
