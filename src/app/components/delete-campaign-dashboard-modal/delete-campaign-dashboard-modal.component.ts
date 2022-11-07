import { Component, Input, OnInit } from '@angular/core';

import { DeleteDashboardData } from 'src/app/core/store/dashboard.action';
import { DeleteModalComponent } from '../delete-modal/delete-modal.component';
import { NbDialogRef } from '@nebular/theme';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Router } from '@angular/router';
import { Store } from '@ngxs/store';
import { deleteCampaignInfo } from 'src/app/core/store/campaign.actions';
import swal from 'sweetalert2';
import { throwError } from 'rxjs';

@Component({
  selector: 'app-delete-campaign-dashboard-modal',
  templateUrl: './delete-campaign-dashboard-modal.component.html',
  styleUrls: ['./delete-campaign-dashboard-modal.component.scss'],
})
export class DeleteCampaignDashboardModalComponent implements OnInit {
  @Input() campaignId: any;
  @Input() isDashboard: any;

  constructor(
    public activeModal: NgbActiveModal,
    protected nbDialoReg: NbDialogRef<DeleteModalComponent>,
    private store: Store,
    private router: Router
  ) {}

  ngOnInit(): void {}

  cancel() {
    this.nbDialoReg.close();
  }

  delete() {
    if (this.isDashboard) {
      this.store.dispatch(new DeleteDashboardData(this.campaignId)).subscribe({
        next: () => {
          this.nbDialoReg.close();
          swal.fire('Success', 'Successfully Deleted', 'success').then(() => {
          });
        },
      });
    } else {
      this.store.dispatch(new deleteCampaignInfo(this.campaignId)).subscribe({
        next: () => {
          this.nbDialoReg.close();
          swal.fire('Success', 'Successfully Deleted', 'success').then(() => {
            this.router.navigate([`/campaigns/campaign-dashboard`]);
          });
        },
        error: (err) => {
          swal.fire('Error', err.error['message'], 'error');
          return throwError(() => new Error(err));
        },
      });
    }
  }
  
}
