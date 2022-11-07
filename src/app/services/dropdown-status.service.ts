import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DropdownStatusService {

  constructor() { }

  selectedStatus = ['All Status', 'Active', 'Scheduled'];
  selectedService = ['All Services', 'Pawning', 'Domestic Remittance'];
}
