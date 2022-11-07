import { AlertState } from './../../core/models/alert.model';
import { Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Subscription } from 'rxjs';
import { AlertService } from 'src/app/services/alert.service';

@Component({
  selector: 'app-alert',
  templateUrl: './alert.component.html',
  styleUrls: ['./alert.component.css'],
  providers: [],

})
export class AlertComponent implements OnInit, OnDestroy {

  alerts: any[] = [];
  subscription: Subscription = <Subscription>{};
  show = false;
  isShow = false;
  @ViewChild('alert', { static: false })
  alert!: { nativeElement: { hidden: boolean; }; };



  constructor(private alertService: AlertService) { }

  ngOnInit(): void {
    this.subscription = this.alertService.alertState.subscribe((state: AlertState) => {
      this.show = state.show;
      setTimeout(()=>{
        this.show = false;
      },3000)
    });
   
  }

  ngAfterViewInit() {
    
  }



  ngOnDestroy(){
    this.subscription.unsubscribe();
  }
}
