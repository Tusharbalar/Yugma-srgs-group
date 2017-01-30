import { NgModule, ErrorHandler } from '@angular/core';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';
import { closeRequestPage } from '../pages/close-request/request';
import { AllRequestPage } from '../pages/all-request/request';
import { TabsPage } from '../pages/tabs/tabs';
import { LoginPage } from '../pages/login/login';

import { AuthService } from '../service/auth.service';
import { RequestService } from '../service/request.service';
import { Configuration } from '../service/app.constants';

import { ListView } from '../customComponent/list/listview.component';
import { CustomNavbar } from '../customComponent/navbar.component.ts';

import { MomentModule } from 'angular2-moment/moment.module';

@NgModule({
  declarations: [
    MyApp,
    closeRequestPage,
    AllRequestPage,
    TabsPage,
    LoginPage,
    ListView,
    CustomNavbar
  ],
  imports: [
    MomentModule,
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    closeRequestPage,
    AllRequestPage,
    TabsPage,
    LoginPage,
    ListView,
    CustomNavbar
  ],
  providers: [{provide: ErrorHandler, useClass: IonicErrorHandler}, AuthService, Configuration, RequestService]
})
export class AppModule {}
