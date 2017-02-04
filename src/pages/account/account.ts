import { Component } from '@angular/core';

import { NavController, Events, ActionSheetController, ModalController } from 'ionic-angular';

import { resetPasswordModal } from './resetPassword/resetPassword';
import { CustomService } from '../../service/customService';
import { LoginPage } from '../login/login';
import { AuthService } from '../../service/auth.service';

@Component({
  selector: 'account',
  templateUrl: 'account.html'
})
export class AccountPage {

  title = "Account";

  constructor(public navCtrl: NavController,
              public events: Events,
              public modalCtrl: ModalController,
              public actionSheetCtrl: ActionSheetController,
              public authService: AuthService,
              public nl: CustomService) {

  }

  name;
  contactNo;
  email;
  id;
  nickName;
  role;
  username;

  ionViewWillEnter() {
    this.name = localStorage.getItem("name");
    this.contactNo = localStorage.getItem("contactNo");
    this.email = localStorage.getItem("email");
    this.id = localStorage.getItem("id");
    this.nickName = localStorage.getItem("nickName");
    this.role = localStorage.getItem("role");
    this.username = localStorage.getItem("username");
  }

  onSubmit() {
    this.nl.showLoader();
    this.authService.logout().subscribe((res) => {
      this.nl.hideLoader()
      this.navCtrl.setRoot(LoginPage);
      this.events.publish('user:logout');
    });
  }

  logoutActionSheet() {
    let actionSheet = this.actionSheetCtrl.create({
      title: 'Are you sure you want to logout ?',
      buttons: [
        {
          text: 'Submit',
          icon: 'ios-paper-outline',
          handler: () => {
            this.onSubmit();
          }
        },{
          text: 'Cancel',
          icon: 'md-close',
          role: 'cancel',
          handler: () => {
            console.log('Cancel clicked');
          }
        }
      ]
    });
    actionSheet.present();
  }

  openModal() {
    let viewComplaint = this.modalCtrl.create(resetPasswordModal);
    viewComplaint.present();
  }

}
