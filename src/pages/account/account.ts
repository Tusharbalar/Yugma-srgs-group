import { Component } from '@angular/core';

import { NavController } from 'ionic-angular';

@Component({
  selector: 'account',
  templateUrl: 'account.html'
})
export class AccountPage {

  title = "Account";

  constructor(public navCtrl: NavController) {

  }

}
