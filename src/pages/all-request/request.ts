import { Component } from '@angular/core';

import { NavController } from 'ionic-angular';

import { RequestService } from '../../service/request.service';

@Component({
  selector: 'all-request',
  templateUrl: 'request.html'
})
export class AllRequestPage {

  currentPage = 1;
  allRequests;

  title = "REQUESTS";
  EmptyRequests = false;

  constructor( public requestService: RequestService) {

  }

  ionViewWillEnter() {
    this.requestService.getRequests(this.currentPage).subscribe(res => {
      console.log("PPPPPP", res);
      if (res.status === 402) {
        console.log("No data");
        this.EmptyRequests = true;
      } else {
        this.EmptyRequests = false;
        this.allRequests = res.json();
      }
    }, (err) => {
      console.log("err", err);
    })
  }

  requestRefresh() {
    console.log("SASASASAS");
  }

  doInfinite() {
    console.log("QQQQq")
  }

}
