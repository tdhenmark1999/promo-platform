import { ALERT_NOTIFICATION_ERROR_TITLE } from './../constant/notification.constant';
import Swal from 'sweetalert2';

export class AlertProvider {
  constructor() {}

  errorSubmissionProvider(err:string) {
    Swal.fire({
      icon: 'error',
      title: ALERT_NOTIFICATION_ERROR_TITLE,
      text: err,
      showConfirmButton: false,
      timer: 1500,
    });
  }
}
