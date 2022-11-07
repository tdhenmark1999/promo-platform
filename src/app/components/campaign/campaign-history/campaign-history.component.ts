import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup } from '@angular/forms';

import { AlertService } from 'src/app/services/alert.service';
import { Component } from '@angular/core';
import { ConfirmationModalComponent } from 'src/app/core/shared/components/confirmation-modal/confirmation-modal.component';
import { DeleteModalComponent } from '../../delete-modal/delete-modal.component';
import { HistoryService } from 'src/app/services/history.service';

@Component({
  selector: 'app-campaign-history',
  templateUrl: './campaign-history.component.html',
  styleUrls: ['./campaign-history.component.scss'],
})
export class CampaignHistoryComponent {
  title = 'promo-platform-project';
  statusForm!: FormGroup;
  serviceForm!: FormGroup;
  pageSize = 5;
  campaignList: any[] = [];
  service!: any;
  status!: any;
  userFilter: any = { name: '' };
  currenRoute: string | undefined;
  isHidden = true;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private historyService: HistoryService,
  ) {}

  ngOnInit() {
    this.statusForm = this.fb.group({ statusControl: ['All Status'] });
    this.serviceForm = this.fb.group({ serviceControl: ['All Services'] });
    this.campaignList = this.historyService.campaignList;
  }

  options = ['All Status', 'Cancelled', 'Completed'];
  services = ['All Services', 'Pawning', 'Domestic Remittance'];

  filterStatus(event: any) {
    if (event && event !== 'All Status') {
      this.campaignList = this.historyService.campaignList.filter(
        (x) => x.status === event
      );
    } else {
      this.campaignList = this.historyService.campaignList.filter(
        (x) => x.status !== event
      );
    }
  }

  filterService(event: any) {
    if (event && event !== 'All Service') {
      this.campaignList = this.historyService.campaignList.filter(
        (x) => x.service === event
      );
    } else {
      this.campaignList = this.historyService.campaignList.filter(
        (x) => x.service !== event
      );
    }
  }

  dashboard() {
    this.router.navigate(['/']);
  }
}
