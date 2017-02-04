import { Component, OnInit } from '@angular/core';
import { ViewController, LoadingController, ToastController } from 'ionic-angular';
import {Validators, FormBuilder, FormGroup, FormControl } from '@angular/forms';

// import service
import { AuthService } from '../../../service/auth.service';

@Component({
  selector: 'reset-password-modal',
  templateUrl: 'resetPassword.html'
})

export class resetPasswordModal implements OnInit {

  resetPasswordForm: FormGroup;
  mismatch: boolean = false;
  public loading;

  constructor(private viewCtrl: ViewController,
              private toastCtrl: ToastController,
              private formBuilder: FormBuilder,
              public loadingCtrl: LoadingController,
              public appService: AuthService) {

  }

  ngOnInit() {
    this.buildForm();
  }

  buildForm() {
    this.resetPasswordForm = new FormGroup({
      oldPassword: new FormControl('', [Validators.required]),
      newPassword: new FormControl('', [Validators.required, Validators.minLength(2)]),
      confirmPassword: new FormControl('', [Validators.required, Validators.minLength(2)]),
    }, passwordMatchValidator);
    function passwordMatchValidator(g: FormGroup) {
       return g.get('newPassword').value === g.get('confirmPassword').value ? null : {'mismatch': true};
    }
  }

  dismiss() {
    this.viewCtrl.dismiss();
  }

  resetPassword() {
    if (!this.resetPasswordForm.valid) {
      this.checkValidation(this.resetPasswordForm.value);
    } else {
      this.presentLoadingDefault();
      this.appService.resetPassword(this.resetPasswordForm.value).subscribe((res) => {
        if (res.status === 200) {
          this.loading.dismiss();
          this.dismiss();
          this.commonToast("Password reset successfully.");
        }
      }, (err) => {
        this.loading.dismiss();
        this.dismiss();
        this.commonToast("Internal Server Error.. please try again");
      });
    }
  }

  checkValidation(value) {
    if (!value.oldPassword) {
      this.commonToast("please enter old password.");
    } else if (!value.newPassword) {
      this.commonToast("please enter new password.");
    } else if (!value.confirmPassword) {
      this.commonToast("please enter confirm password.");
    } else if (value.newPassword && value.confirmPassword) {
      this.commonToast("New password and confirm password not matched.");
    }
  }

  presentLoadingDefault() {
    this.loading = this.loadingCtrl.create({
      content: 'Please wait...'
    });
    this.loading.present();
  }

  commonToast(msg) {
    let toast = this.toastCtrl.create({
      message: msg,
      duration: 3000,
      position: 'bottom'
    });
    toast.present();
  }
}
