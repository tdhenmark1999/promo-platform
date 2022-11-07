import { ActivatedRoute, Router } from '@angular/router';
import { Component, EventEmitter, Injectable, Input, OnInit, Output } from '@angular/core';
import { Observable, Subject } from 'rxjs';

import { Dashboard } from 'src/app/core/models/dashboard.model';
import { DeleteCampaignDashboardModalComponent } from 'src/app/components/delete-campaign-dashboard-modal/delete-campaign-dashboard-modal.component';
import { NbDialogService } from '@nebular/theme';
import { Store } from '@ngxs/store';

@Component({
  selector: 'app-dashboard-table',
  templateUrl: './dashboard-table.component.html',
  styleUrls: ['./dashboard-table.component.scss']
})

@Injectable()
export class DashboardTableComponent implements OnInit {
  [x: string]: any;

  @Input()
  dashboardData: Dashboard[] | any;
  @Input() isDashboard!: boolean;
  @Input() dashboardDataLength!: number | any;
  @Input() isDashboardLoading:any;
  @Input() items_per_page$:any
  @Input() isCampaignTableEmpty!: boolean;
  @Input() userId!: any;
  @Input() name!: any;
  @Input()
  totalPages!: any;
  @Input() currentPage:any;
  @Input() itemsPerPage:any;
  @Input() pageSize:any;
  @Input() page:any;
  @Output() selectedPage = new EventEmitter<string>();
  service!: string;
  status!: string;
  userFilter: any = { name: '' };
  campaign:any;
  dashboardData$:Observable<any> | undefined;

  totalPagesofDashboard:any;
  currentPageofDashboard:any;
  itemsPerPageofDashboard:any;
  private destroy$ = new Subject();


  campaignId = this.route.snapshot.params['id'];

  constructor(
    private router:Router,
    private modalService: NbDialogService,
    private route: ActivatedRoute,
  ) { }

  ngOnInit(): void {
  }

  ngOnChanges(){
  }

 

  openDeleteModal() {

  }

  ngOnDestroy(): void {
    this.destroy$.next(null);
  }

  gotoDetails(id:number){
    this.router.navigate([`/campaigns/campaign-detail/${id}`],{
      queryParams: {
        UserID: this.userId,
        Name: this.name
      }
    });
  }

  deleteCampaignModal(data: any) {
    this.modalService.open(DeleteCampaignDashboardModalComponent, {
      context: {
        campaignId: data.fld_CampaignId,
        isDashboard:true
      }
    });
  }

  pageChange(event:any){
      if(event){
        this.selectedPage.emit(event);
      }
  }

}
