import { Component } from '@angular/core';

import { NavController, ModalController, ActionSheetController, PopoverController } from 'ionic-angular';

import { RequestService } from '../../service/request.service';
import { CustomService } from '../../service/customService';
import { newRequestModal } from './new/newRequestModal';
import { ViewComponent } from './view/viewRequestModal';
import { LoginPage } from '../login/login';
import { PopoverPage } from './PopoverPage';
import * as _ from 'underscore';


@Component({
  selector: 'all-request',
  templateUrl: 'request.html'
})
export class AllRequestPage {

  currentPage = 1;
  allRequests;

  EmptyRequests = false;
  statusName: string = "ALL";
  title = "REQUESTS";

  data;

  selectedStatus = 0;

  constructor(public requestService: RequestService,
              public actionSheetCtrl: ActionSheetController,
              public modalCtrl: ModalController,
              public popoverCtrl: PopoverController,
              public navCtrl: NavController,
              public cs: CustomService) {

  }

  ionViewWillEnter() {
    this.getRequests();
  }

  getRequests() {
    this.cs.showLoader();
    this.requestService.getRequests(this.currentPage).subscribe(res => {
      if (res.status === 204) {
        this.EmptyRequests = true;
      } else {
        this.EmptyRequests = false;
        this.allRequests = res.json();
      }
      this.cs.hideLoader();
    }, (err) => {
      this.cs.hideLoader();
      this.cs.errMessage();
    });
  }

  newRequest(): void {
    let newRequest = this.modalCtrl.create(newRequestModal);
    newRequest.onDidDismiss((newRequest) => {
      if (!newRequest) { return; }
      if (!this.allRequests) { this.allRequests = []; }
      this.EmptyRequests = false;
      this.allRequests.unshift(newRequest);
    });
    newRequest.present();
  }

  onError() {
    this.cs.hideLoader();
    this.cs.errMessage();
  }

  HasComplaintSelect;

  viewRequest(complaint) {
    this.HasComplaintSelect = complaint;
    this.cs.showLoader();
    this.requestService.getFullRequest(complaint.id).subscribe((res) => {
      this.cs.hideLoader();
      let viewRequest = this.modalCtrl.create(ViewComponent, {request: res.json()});
      viewRequest.onDidDismiss((data) => {
        if (!res) { return; }
        this.HasComplaintSelect.statusName = data.statusName;
        this.HasComplaintSelect.statusId = data.statusId;
        this.HasComplaintSelect.statusColor = data.statusColor;
      });
      viewRequest.present();
    }, (err) => {
      this.onError();
    });
  }


  doInfinite(infiniteScroll) {
    this.currentPage += 1;
    setTimeout(() => {
      if (this.selectedStatus === 0) {
        this.requestService.getRequests(this.currentPage).subscribe(response => {
          if (response.status === 204) {
            this.currentPage -= 1;
            infiniteScroll.complete();
            return;
          }
          this.allRequests = this.allRequests.concat(response.json());
        }, (err) => {
          this.currentPage -= 1;
          this.EmptyRequests = false;
          this.cs.errMessage();
        });
      } else {
        this.doInfiniteRequestByStatus(infiniteScroll, this.data);
      }
      infiniteScroll.complete();
    }, 1000);
  }

  doRefresh(refresher) {
    this.currentPage = 1;
    setTimeout(() => {
      if (this.selectedStatus === 0) {
        this.requestService.getRequests(this.currentPage).subscribe(response => {
          if (response.status === 204) {
            this.EmptyRequests = true;
          } else {
            this.EmptyRequests = false;
            this.allRequests = response.json();
          }
        }, (err) => {
          this.cs.errMessage();
        });
      } else {
        this.doRefreshRequestByStatus(refresher, this.data);
      }
      refresher.complete();
    }, 1000);
  }

  presentPopover(myEvent) {
    let filterInfo = JSON.parse(localStorage.getItem("filterInfo"));
    let popover = this.popoverCtrl.create(PopoverPage, {selectedStatus: this.selectedStatus, filterInfo: filterInfo});
    popover.onDidDismiss((data) => {
      if (!data) { return; }
      this.data = data;
      this.filterRequest(data);
    });
    popover.present({
      ev: myEvent
    });
  }

  filterRequest(data) {
    this.selectedStatus = data.id;
    if (this.selectedStatus === 0) {
      this.title = "";
    } else {
      this.title = "REQUESTS";
    }
    this.statusName = data.name;
    this.allRequests = [];
    if (data.id) {
      this.requestByStatus(data);
    } else {
      this.currentPage = 1;
      this.getRequests();
    }
  }

  requestByStatus(data) {
    this.cs.showLoader();
    this.currentPage = 1;
    this.requestService.getRequestByStatus(data.id, this.currentPage).subscribe((response) => {
      this.cs.hideLoader();
      if (response.status === 204) {
        this.EmptyRequests = true;
      } else {
        this.EmptyRequests = false;
        this.allRequests = response.json();
      }
    }, (err) => {
      this.cs.hideLoader();
      this.cs.errMessage();
    });
  }

  doInfiniteRequestByStatus(infiniteScroll, data) {
    this.requestService.getRequestByStatus(data.id, this.currentPage).subscribe((response) => {
      if (response.status === 204) {
        this.currentPage -= 1;
        infiniteScroll.complete();
        return;
      }
      this.allRequests = this.allRequests.concat(response.json());
    }, (err) => {
      this.currentPage -= 1;
      this.EmptyRequests = false;
      infiniteScroll.complete();
    });
  }

  doRefreshRequestByStatus(refresher, data) {
    this.requestService.getRequestByStatus(data.id, 1).subscribe((response) => {
      if (response.status === 204) {
        this.EmptyRequests = true;
      } else {
        this.EmptyRequests = false;
        this.allRequests = response.json();
      }
    }, (err) => {
      refresher.complete();
      this.cs.errMessage();
    });
  }

}
