import { Component } from '@angular/core';

import { NavController, ModalController, ActionSheetController } from 'ionic-angular';

import { RequestService } from '../../service/request.service';
import { CustomService } from '../../service/customService';
import { newRequestModal } from './new/newRequestModal';
import { ViewComponent } from './view/viewRequestModal';
import { LoginPage } from '../login/login';

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
              public actionSheetCtrl: ActionSheetController,
              public modalCtrl: ModalController,
              public navCtrl: NavController,
              public cs: CustomService) {

  }

  ionViewWillEnter() {
    this.cs.showLoader();
    this.requestService.getRequests(this.currentPage).subscribe(res => {
      if (res.status === 204) {
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

  newRequest(): void {
    let newRequest = this.modalCtrl.create(newRequestModal);
    newRequest.onDidDismiss((newRequest) => {
      console.log("DSa", newRequest)
      if (!newRequest) { return; }
      if (!this.allRequests) { this.allRequests = []; }
      this.EmptyRequests = false;
      this.allRequests.unshift(newRequest);
    });
    newRequest.present();
  }

  viewRequest(request): void {
    let viewRequest = this.modalCtrl.create(ViewComponent, {request: request});
    viewRequest.present();
  }

  doInfinite(infiniteScroll) {
    this.currentPage += 1;
    setTimeout(() => {
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

  logout() {
    let actionSheet = this.actionSheetCtrl.create({
      title: 'Are you sure you want to logout ?',
      buttons: [
        {
          text: 'Submit',
          icon: 'ios-paper-outline',
          handler: () => {
            localStorage.clear();
            this.navCtrl.setRoot(LoginPage);
          }
        },{
          text: 'Cancel',
          icon: 'md-close',
          role: 'cancel',
          handler: () => {
            console.log('Cancel clicked');
          }
        }
      ]
    });
    actionSheet.present();
  }
}
