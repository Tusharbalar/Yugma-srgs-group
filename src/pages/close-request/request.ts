import { Component } from '@angular/core';

import { NavController } from 'ionic-angular';

@Component({
  selector: 'close-request',
  templateUrl: 'request.html'
})
export class closeRequestPage {

  title = "Requests";
  
  constructor(public navCtrl: NavController) {

  }

}
