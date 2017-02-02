import { Component, ViewChild } from '@angular/core';
import { Platform, Nav } from 'ionic-angular';
import { StatusBar, Splashscreen } from 'ionic-native';

// import component
import { LoginPage } from '../pages/login/login';

import { DashboardComponent } from '../pages/dashboard/dashboard.component';
import { TabsPage } from '../pages/tabs/tabs';

import { Configuration } from '../service/app.constants';
import { AuthService } from '../service/auth.service';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {

  rootPage;
  selectedPage:string;

  @ViewChild(Nav) nav: Nav;

  pages: Array<{title: string, component: any, icon: any, url: string}>;

  constructor(platform: Platform,
              private _configuration: Configuration,
              public authService: AuthService) {
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      StatusBar.styleDefault();
      Splashscreen.hide();
    });

    this.pages = [
      { title: 'Dashboard', component: DashboardComponent, icon: 'ios-home-outline', url: 'dashboard' },
      { title: 'Complaints', component: TabsPage, icon: 'ios-sad-outline', url: 'complaint' }
    ];

    this.hasLoggedIn();
  }

  hasLoggedIn() {
    if (this.authService.isLoggedIn()) {
      this.rootPage = DashboardComponent;
    } else {
      this.rootPage = LoginPage;
    }
  }

  openPage(page) {
    this.selectedPage = page.title;
    this._configuration.setUrl(page.url);
    this.nav.setRoot(page.component);
  }

}
