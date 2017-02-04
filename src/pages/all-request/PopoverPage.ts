import { Component } from '@angular/core';
import { NavController, ModalController, ActionSheetController, PopoverController, ViewController, NavParams } from 'ionic-angular';

import { RequestService } from '../../service/request.service';
import { CustomService } from '../../service/customService';

@Component({
  template: `
    <ion-list radio-group [(ngModel)]="autoManufacturers">
      <ion-item *ngFor="let a of status">
        <ion-label>{{a.status}}</ion-label>
        <ion-radio value="{{a.id}}" (click)="aa(a.id)"></ion-radio>
      </ion-item>
    </ion-list>
  `
})

export class PopoverPage {

  selectStatus;
  selectedStatus;
  autoManufacturers;

  constructor(public viewCtrl: ViewController,
              private navParams: NavParams) {
  }

  ngOnInit() {
    this.selectStatus = this.navParams.get('selectedStatus');
    this.autoManufacturers = this.selectStatus;
  }

  close() {
    this.viewCtrl.dismiss();
  }

  status = [{
    id: 1,
    status: "New"
  }, {
    id: 2,
    status: "Inprogress"
  }, {
    id: 3,
    status: "Assigned"
  }, {
    id: 4,
    status: "Closed"
  }, {
    id: 5,
    status: "Reopen"
  }, {
    id: 6,
    status: "Satisfied"
  }, {
    id: 0,
    status: "All Requests"
  }];

  aa(id) {
    console.log("AAAAA",  id);
    this.viewCtrl.dismiss(id);
    this.selectedStatus = id;
  }

}
