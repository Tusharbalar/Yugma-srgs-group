import { NgModule, ErrorHandler } from '@angular/core';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';
import { closeRequestPage } from '../pages/close-request/request';
import { AllRequestPage } from '../pages/all-request/request';
import { TabsPage } from '../pages/tabs/tabs';
import { LoginPage } from '../pages/login/login';

import { AuthService } from '../service/auth.service';
import { Configuration } from '../service/app.constants';

@NgModule({
  declarations: [
    MyApp,
    closeRequestPage,
    AllRequestPage,
    TabsPage,
    LoginPage
  ],
  imports: [
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    closeRequestPage,
    AllRequestPage,
    TabsPage,
    LoginPage
  ],
  providers: [{provide: ErrorHandler, useClass: IonicErrorHandler}, AuthService, Configuration]
})
export class AppModule {}
