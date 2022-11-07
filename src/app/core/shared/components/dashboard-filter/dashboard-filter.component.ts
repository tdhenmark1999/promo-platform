import { ActivatedRoute, Router } from '@angular/router';
import { Component, EventEmitter, Injectable, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

import { ConnectableObservable } from 'rxjs';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-dashboard-filter',
  templateUrl: './dashboard-filter.component.html',
  styleUrls: ['./dashboard-filter.component.scss'],
})

@Injectable()
export class DashboardFilterComponent implements OnInit {
  @Input() status: any[] = [];
  @Input() services: any[] = [];
  @Input() isDashboard!: boolean;
  @Input() disableAllForms!: boolean;
  @Input() dashboardDataLength: number | any;
  @Output() filterFormValues = new EventEmitter<any>();
  @Input() statusValue!: number;
  @Input() serviceValue!: string;
  @Input() searchValue!: string;

  filterForm!: FormGroup;
  isFilterDisabled: boolean = false;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private activatedRoute: ActivatedRoute
    ) {
    this.filterForm = this.fb.group({
      Status: [0],
      Service: [''],
      Search: [''],
    });
  }

  ngOnInit(): void {
  }

  ngOnChanges(){
    this.disableAllForms ?
    this.disableForms():
    this.enableForms();

    this.filterForm.patchValue({
      Search: this.searchValue,
      Service: this.serviceValue,
      Status: this.statusValue
    });
  }

  disableForms(){
    this.isFilterDisabled = true;
    this.filterForm.get('Search')?.disable();
    this.filterForm.get('Service')?.disable();
    this.filterForm.get('Status')?.disable();
  }

  enableForms(){
    this.isFilterDisabled = false;
    this.filterForm.get('Search')?.enable();
    this.filterForm.get('Service')?.enable();
    this.filterForm.get('Status')?.enable();
  }

  emitFilterForm(){
    this.router.navigate([], {
      relativeTo: this.activatedRoute,
      queryParams: {
        ...this.filterForm.value,
        page: ''
      },
      queryParamsHandling: 'merge',
      skipLocationChange: false
    });
  }

  submitSearch(){
      this.emitFilterForm();
  }

}
