import { Component, OnInit } from '@angular/core';

import { LoadingController, NavController, ToastController, AlertController, MenuController } from 'ionic-angular';

import { Configuration } from '../../service/app.constants';
import { AuthService } from '../../service/auth.service';

import { AllRequestPage } from '../all-request/request';

@Component({
  selector: 'page-login',
  templateUrl: 'login.html'
})

export class LoginPage implements OnInit {

  user: any;

  numberSubmit: boolean = false;
  otpSubmit: boolean = false;

  loading;
  username;
  password;

  constructor(public navCtrl: NavController,
              public authService: AuthService,
              public loadingCtrl: LoadingController,
              public configuration: Configuration,
              public menuCtrl: MenuController,
              public toastCtrl: ToastController,
              private alertCtrl: AlertController) { this.menuCtrl.enable(false); }

  ngOnInit() {
  }

  login() {
    let data = {
      username: this.username,
      password: this.password
    }
    this.presentLoadingDefault('Authenticating...');
    this.authService.verifyUser(data).subscribe(response => {
      this.loading.dismiss();
      this.navCtrl.setRoot(AllRequestPage);  // Set homepage to root
      this.successToast();
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

}
