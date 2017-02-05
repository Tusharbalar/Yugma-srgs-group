import { Component, OnInit } from '@angular/core';

declare let google;

@Component({
  selector: 'dashboard-component',
  templateUrl: 'dashboard.component.html'
})

export class DashboardComponent implements OnInit {

  public title: string = "Dashboard";

  constructor() {
  }

  ngOnInit() {
  }

}
