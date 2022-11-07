import { Component, Input, OnInit } from '@angular/core';

import { NbDialogRef } from '@nebular/theme';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Router } from '@angular/router';
import { Store } from '@ngxs/store';
import { deleteCampaignInfo } from './../../core/store/campaign.actions';
import swal from 'sweetalert2';
import { throwError } from 'rxjs';

@Component({
  selector: 'app-delete-modal',
  templateUrl: './delete-modal.component.html',
  styleUrls: ['./delete-modal.component.scss'],
})
export class DeleteModalComponent implements OnInit {
  @Input() campaignId: any;

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
    this.store.dispatch(new deleteCampaignInfo(this.campaignId)).subscribe({
      next: () => {
        this.nbDialoReg.close();
        swal.fire('Success', 'Successfully Deleted', 'success').then(()=>{
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
