import { StringMap } from '@angular/compiler/src/compiler_facade_interface';
import { Injectable } from '@angular/core';
import { BehaviorSubject, interval, Subject, Subscription } from 'rxjs';
import { AlertState } from '../../app/core/models/alert.model';


interface Alert{
  id: number,
  alertType: String,
  message: String,
  countdownSubscription: Subscription
}

@Injectable({
  providedIn: 'root'
})
export class AlertService {
  private loaderSubject = new Subject<AlertState>();
  alertState = this.loaderSubject.asObservable();

  constructor() {}

  show() {
    this.loaderSubject.next({ show: true } as AlertState);
  }

  hide() {
    this.loaderSubject.next({ show: false } as AlertState);
  }

}
