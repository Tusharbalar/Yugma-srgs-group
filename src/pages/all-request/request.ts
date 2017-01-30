import { Component } from '@angular/core';

import { NavController } from 'ionic-angular';

import { RequestService } from '../../service/request.service';
import { CustomService } from '../../service/customService';

@Component({
  selector: 'all-request',
  templateUrl: 'request.html'
})
export class AllRequestPage {

  currentPage = 1;
  allRequests;

  title = "REQUESTS";
  EmptyRequests = false;

  constructor(public requestService: RequestService,
              public cs: CustomService) {

  }

  ionViewWillEnter() {
    this.cs.showLoader();
    this.requestService.getRequests(this.currentPage).subscribe(res => {
      if (res.status === 402) {
        console.log("No data");
        this.EmptyRequests = true;
      } else {
        this.EmptyRequests = false;
        this.allRequests = res.json();
      }
      this.cs.hideLoader();
    }, (err) => {
      this.cs.hideLoader();
      this.cs.errMessage();
    })
  }

  doInfinite(infiniteScroll) {
    this.currentPage += 1;
    setTimeout(() => {
      this.requestService.getRequests(this.currentPage).subscribe(response => {
        if (response.status === 204) {
          this.currentPage -= 1;
          infiniteScroll.complete();
          infiniteScroll.enable(false);
          return;
        }
        this.allRequests = this.allRequests.concat(response.json());
      }, (err) => {
        this.currentPage -= 1;
        this.EmptyRequests = false;
      });
      infiniteScroll.complete();
    }, 1000);
  }

  doRefresh(refresher) {
    this.currentPage = 1;
    setTimeout(() => {
      this.requestService.getRequests(this.currentPage).subscribe(response => {
        if (response.status === 204) {
          this.EmptyRequests = true;
          this.currentPage -= 1;
        } else {
          this.EmptyRequests = false;
          this.allRequests = response.json();
        }
      });
      refresher.complete();
    }, 1000);
  }


}
