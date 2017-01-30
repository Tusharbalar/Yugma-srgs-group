import { Component } from '@angular/core';
import { ViewController, LoadingController, ToastController } from 'ionic-angular';

// import service
import { AuthService } from '../../service/auth.service';

@Component({
  selector: 'forgot-password-modal',
  templateUrl: 'forgotPassword.html'
})

export class ForgotPasswordModal {

  public username: string;
  public loading;

  title: string = "Forgot Password";
  complaint = {};

  constructor(private viewCtrl: ViewController,
              private toastCtrl: ToastController,
              public loadingCtrl: LoadingController,
              public appService: AuthService) {

  }

  dismiss() {
    this.viewCtrl.dismiss();
  }

  forgotPassword() {

    this.presentLoadingDefault();

    this.appService.forgotPassword(this.username).subscribe(response => {
      this.dismiss();
      this.loading.dismiss();
      this.successToast();
    }, err => {
      this.loading.dismiss();
      this.dismiss();
      if (err.status === 400) {
        this.errorToast();
      } else {
        this.newErrorToast();
      }
    });
  }

  presentLoadingDefault() {
    this.loading = this.loadingCtrl.create({
      content: 'Authenticating...'
    });
    this.loading.present();
  }

  errorToast() {
    let toast = this.toastCtrl.create({
      message: 'Invalid username',
      duration: 3000,
      position: 'bottom'
    });
    toast.present();
  }

  newErrorToast() {
    let toast = this.toastCtrl.create({
      message: 'Koi nai error he.. please check it...',
      duration: 3000,
      position: 'bottom'
    });
    toast.present();
  }

  successToast() {
    let toast = this.toastCtrl.create({
      message: 'Password sent to your register mobile number',
      duration: 3000,
      position: 'bottom'
    });
    toast.present();
  }

}
