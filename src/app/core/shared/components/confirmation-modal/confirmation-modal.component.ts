import { Component, Input, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-confirmation-modal',
  templateUrl: './confirmation-modal.component.html',
  styleUrls: ['./confirmation-modal.component.scss']
})
export class ConfirmationModalComponent implements OnInit {

  DEFAULT_MESSAGE = "Are you sure you want to delete this campaign? This action cannot be undone.";
  MODAL_TITLE = "DELETE CAMPAIGN";
  CANCEL_BUTTON = "Cancel";
  CONFIRM_BUTTON = "Delete";

  @Input() message = this.DEFAULT_MESSAGE;
  @Input() title = this.MODAL_TITLE;
  @Input() cancelButton = this.CANCEL_BUTTON;
  @Input() confirmButton = this.CONFIRM_BUTTON;

  constructor(public activeModal: NgbActiveModal) { }

  ngOnInit(): void {
  }

  cancel(){
    this.activeModal.close(false);
    console.log('cancel')
  }

  delete(){
    this.activeModal.close(true);
    console.log('delete')
  }

}
