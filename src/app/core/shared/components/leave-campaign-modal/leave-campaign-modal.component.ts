
import { Store } from '@ngxs/store';
import {
  Component,
  Injectable,
  OnInit,
  Optional,
} from '@angular/core';
import { Router } from '@angular/router';
import { NbDialogRef } from '@nebular/theme';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Subject } from 'rxjs/internal/Subject';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-leave-campaign-modal',
  templateUrl: './leave-campaign-modal.component.html',
  styleUrls: ['./leave-campaign-modal.component.scss'],
})

@Injectable()
export class LeaveCampaignModalComponent implements OnInit {

  UserId!: Observable<string>;
  Name! : Observable<string>;
  
  private destroy$ = new Subject();


  constructor(
    public activeModal: NgbActiveModal,
    private router:Router,
    @Optional() protected nbDialoReg: NbDialogRef<LeaveCampaignModalComponent>
  ) {}



  ngOnInit(): void {
    
  }

  cancel(){
    this.nbDialoReg.close(false);
  }

  leave(){
    this.nbDialoReg.close(true);
  }

}
