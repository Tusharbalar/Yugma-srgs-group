import { Component, ViewChild } from '@angular/core';
import { Platform, Nav, Events, MenuController, AlertController } from 'ionic-angular';
import { StatusBar, Splashscreen } from 'ionic-native';

// import component
import { LoginPage } from '../pages/login/login';

import { DashboardComponent } from '../pages/dashboard/dashboard.component';
import { TabsPage } from '../pages/tabs/tabs';
import { AccountPage } from '../pages/account/account';

import { Configuration } from '../service/app.constants';
import { AuthService } from '../service/auth.service';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {

  rootPage;
  selectedPage:string;
  name: string;

  @ViewChild(Nav) nav: Nav;

  pages: Array<{title: string, component: any, icon: any, url: string}>;

  constructor(platform: Platform,
              public events: Events,
              public alertCtrl: AlertController,
              public menu: MenuController,
              private _configuration: Configuration,
              public authService: AuthService) {
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      StatusBar.styleDefault();
      Splashscreen.hide();
      this.listenToLoginEvents();
    });

    this.pages = [
      { title: 'Dashboard', component: DashboardComponent, icon: 'ios-home-outline', url: 'dashboard' },
      { title: 'Complaints', component: TabsPage, icon: 'ios-sad-outline', url: 'complaint' },
      { title: 'Account', component: AccountPage, icon: 'ios-contact-outline', url: 'account' }
    ];

    this.hasLoggedIn();
  }

  hasLoggedIn() {
    if (this.authService.isLoggedIn()) {
      this.rootPage = DashboardComponent;
      this.getUserName();
    } else {
      this.rootPage = LoginPage;
    }
  }

  openPage(page) {
    this.selectedPage = page.title;
    this._configuration.setUrl(page.url);
    this.nav.setRoot(page.component);
  }

  getUserName() {
    this.name = localStorage.getItem("name");
  }

  enableMenu(loggedIn) {
    this.menu.enable(loggedIn);
  }

  listenToLoginEvents() {
    this.events.subscribe('user:login', () => {
      console.log("Login successfully");
      this.getUserName();
      this.enableMenu(true);
      this.rootPage = DashboardComponent;
    });
    this.events.subscribe('user:logout', () => {
      this.enableMenu(false);
      this.authService.resetLoginStatus();
    });
    this.events.subscribe("session:expired", (data) => {
      this.presentConfirm();
    });
  }

  presentConfirm() {
    let alert = this.alertCtrl.create({
      title: 'Session Expired',
      message: "You're already logged in some other device. You may again login.",
      enableBackdropDismiss: false,
      buttons: [
        {
          text: 'Logout',
          handler: () => {
            this.onSubmit();
          }
        }
      ]
    });
    alert.present();
  }

  onSubmit() {
    localStorage.clear();
    this.rootPage = LoginPage;
    this.events.publish('user:logout');
  }

}
