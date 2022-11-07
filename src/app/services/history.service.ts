import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class HistoryService {

  constructor() { }

  campaignList = [
    {
      "created": "Nov 15, 2021",
      "name": "Sangla Holiday Season 2021",
      "status": "Cancelled",
      "service": "Pawning",
      "start_date" : "Dec 01, 2021",
      "end_date" : "Feb 15, 2022",
      "icon" : ""
    },
    {
      "created": "Sep 10, 2021",
      "name": "Balikbayan Promo 2021",
      "status": "Cancelled",
      "service": "Domestic Remittance",
      "start_date" : "Dec 01, 2021",
      "end_date" : "Dec 31, 2021",
      "icon" : ""
    },
    {
      "created": "Sep 05, 2021",
      "name": "Double the Pawn Fun",
      "status": "Cancelled",
      "service": "Pawning",
      "start_date" : "Dec 01, 2021",
      "end_date" : "Feb 15, 2022",
      "icon" : ""
    },
    {
      "created": "Sep 07, 2021",
      "name": "Lorem Ipsum Dolor Sit Amet",
      "status": "Completed",
      "service": "Pawning",
      "start_date" : "Jan 01, 2022",
      "end_date" : "Feb 15, 2022",
      "icon" : "fa fa-trash"
    },
    {
      "created": "May 07, 2021",
      "name": "CASHwertend Padala 2021",
      "status": "Completed",
      "service": "Domestic Remittance",
      "start_date" : "Dec 01, 2022",
      "end_date" : "Feb 15, 2022",
      "icon" : "fa fa-trash"
    },
    {
      "created": "Sep 07, 2021",
      "name": "Lorem Ipsum Dolor Sit Amet",
      "status": "Completed",
      "service": "Pawning",
      "start_date" : "Jan 01, 2022",
      "end_date" : "Feb 15, 2022",
      "icon" : "fa fa-trash"
    },
    {
      "created": "May 07, 2021",
      "name": "CASHwertend Padala 2021",
      "status": "Completed",
      "service": "Domestic Remittance",
      "start_date" : "Dec 01, 2022",
      "end_date" : "Feb 15, 2022",
      "icon" : "fa fa-trash"
    },
    {
      "created": "Sep 07, 2021",
      "name": "Lorem Ipsum Dolor Sit Amet",
      "status": "Completed",
      "service": "Pawning",
      "start_date" : "Jan 01, 2022",
      "end_date" : "Feb 15, 2022",
      "icon" : "fa fa-trash"
    }
  ]
}
