import { Component } from '@angular/core';
import { ViewController, NavParams } from 'ionic-angular';

@Component({
  template: `
    <ion-list radio-group [(ngModel)]="autoManufacturers">
      <ion-item *ngFor="let a of status">
        <ion-label>{{a.name}}</ion-label>
        <ion-radio value="{{a.id}}" (click)="aa(a)"></ion-radio>
      </ion-item>
    </ion-list>
  `
})

export class PopoverPage {

  selectStatus;
  selectedStatus;
  autoManufacturers;
  status;

  constructor(public viewCtrl: ViewController,
              private navParams: NavParams) {
  }

  ngOnInit() {
    this.selectStatus = this.navParams.get('selectedStatus');
    this.status = this.navParams.get('filterInfo');
    this.autoManufacturers = this.selectStatus;
  }

  close() {
    this.viewCtrl.dismiss();
  }

  aa(data) {
    console.log("AAAAA",  data.id);
    this.viewCtrl.dismiss(data);
    this.selectedStatus = data.id;
  }

}
