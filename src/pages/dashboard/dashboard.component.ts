import { Component, OnInit } from '@angular/core';
import { ComplaintSuggestion } from '../../service/cs.service';

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
