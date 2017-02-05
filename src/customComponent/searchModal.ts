import { Component, OnInit } from '@angular/core';
import { ViewController, NavParams } from 'ionic-angular';

@Component({
  selector: 'search-teacher',
  template: `
    <ion-header>
      <ion-navbar color="primary" no-border-bottom>
        <ion-buttons start>
          <button ion-button class="navBtnRight" color="light" (click)="dismiss()">
            <span  showWhen="ios"><ion-icon name="close-circle" color="light"></ion-icon></span>
            <ion-icon name="md-close" color="light" showWhen="android,windows"></ion-icon>
          </button>
        </ion-buttons>
        <ion-title>
          Assign To
        </ion-title>
      </ion-navbar>
      <ion-toolbar color="primary" no-border-top>
        <ion-searchbar [(ngModel)]="searchQuery" (ionInput)="searchEmployees($event)" placeholder="Search">
        </ion-searchbar>
      </ion-toolbar>
    </ion-header>
    <ion-content class="csBackgroundGray">
      <ion-list>
        <ion-item *ngFor="let employee of editInfo" (click)="assignTo(employee)">
          <span>{{employee.name}}</span>
        </ion-item>
      </ion-list>
    </ion-content>
    `
})

export class SearchModal implements OnInit{

  searchQuery: string = '';
  editInfo = [];

  constructor(private viewCtrl: ViewController,
              private navParams: NavParams) {

  }

  ngOnInit() {
    console.log("edit info", this.editInfo);
    this.loadEmployees();
  }

  loadEmployees() {
    this.editInfo = this.navParams.get('info');
  }

  dismiss() {
    this.viewCtrl.dismiss();
  }

  searchEmployees(ev: any) {

    this.loadEmployees();

    // set val to the value of the searchbar
    let val = ev.target.value;

    // if the value is an empty string don't filter the items
    if (val && val.trim() != '') {
      this.editInfo = this.editInfo.filter((item) => {
        return (item.name.toLowerCase().indexOf(val.toLowerCase()) > -1);
      })
    }

  }

  assignTo(employee) {
    this.viewCtrl.dismiss(employee);
  }

}
