import { Component } from '@angular/core';

import { LoadingController, NavController, ToastController, AlertController, MenuController } from 'ionic-angular';

import { Configuration } from '../../service/app.constants';
import { AuthService } from '../../service/auth.service';

import { TabsPage } from '../tabs/tabs';

@Component({
  selector: 'page-login',
  templateUrl: 'login.html'
})

export class LoginPage {

  user: any;

  loading;
  username;
  password;

  relationship1;

  constructor(public navCtrl: NavController,
              public authService: AuthService,
              public loadingCtrl: LoadingController,
              public configuration: Configuration,
              public menuCtrl: MenuController,
              public toastCtrl: ToastController,
              private alertCtrl: AlertController) { this.menuCtrl.enable(false); }

  login() {
    if (this.username === undefined || this.password === undefined) { return false; }
    let data = {
      username: this.username,
      password: this.password
    }
    this.presentLoadingDefault('Authenticating...');
    this.authService.verifyUser(data).subscribe(response => {
      this.authService.info(response).subscribe((res) => {
        console.log("response from user info", res);
        this.authService.storeData(res);
        this.navCtrl.setRoot(TabsPage);  // Set homepage to root
        this.loading.dismiss();
        this.successToast();
      }, (err) => {
        console.log("err", err);
      })
    }, (err) => {
      this.loading.dismiss();
      if (err.status === 400) {
        this.errorToast('Invalid username or password');
      } else {
        this.errorToast('Internal server error.. Try again later');
      }
    });
  }

  presentLoadingDefault(msg) {
    this.loading = this.loadingCtrl.create({
      content: msg
    });
    this.loading.present();
  }

  errorToast(msg) {
    let toast = this.toastCtrl.create({
      message: msg,
      duration: 3000,
      position: 'bottom'
    });
    toast.present();
  }

  successToast() {
    let toast = this.toastCtrl.create({
      message: 'Account setup successfully...',
      duration: 3000,
      position: 'bottom'
    });
    toast.present();
  }

  select(name) {
    console.log("FDSFDS", name)
  }

}
