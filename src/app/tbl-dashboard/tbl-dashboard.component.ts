import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-tbl-dashboard',
  templateUrl: './tbl-dashboard.component.html',
  styleUrls: ['./tbl-dashboard.component.css']
})
export class TblDashboardComponent implements OnInit {

  @Input() dashboardData: any;

  constructor() { }

  ngOnInit(): void {
  }

}
