import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar, Splashscreen } from 'ionic-native';

import { TabsPage } from '../pages/tabs/tabs';

// import component
import { LoginPage } from '../pages/login/login';

import { AuthService } from '../service/auth.service';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage;

  pages: Array<{title: string, icon: any, url: string}>;

  constructor(platform: Platform,
              public authService: AuthService) {
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      StatusBar.styleDefault();
      Splashscreen.hide();
    });

    this.pages = [
      { title: 'Dashboard', icon: 'ios-home-outline', url: 'dashboard' },
      { title: 'Complaints',  icon: 'ios-sad-outline', url: 'complaint' },
      { title: 'Suggestions',  icon: 'md-bulb', url: 'suggestion' },
      { title: 'Appreciations',  icon: 'ios-thumbs-up-outline', url: 'appreciation' },
      { title: 'Event',  icon: 'ios-calendar-outline', url: 'planner' }
    ];

    this.hasLoggedIn();
  }

  hasLoggedIn() {
    if (this.authService.isLoggedIn()) {
      this.rootPage = TabsPage;
    } else {
      this.rootPage = LoginPage;
    }
  }
}
