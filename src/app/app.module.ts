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

import { DashboardComponent } from '../pages/dashboard/dashboard.component';

import { ListView } from '../customComponent/list/listview.component';
import { CustomNavbar } from '../customComponent/navbar.component.ts';

import { ViewComponent } from '../pages/all-request/view/viewRequestModal';
import { newRequestModal } from '../pages/all-request/new/newRequestModal';
import { CustomService } from '../service/customService';
import { MomentModule } from 'angular2-moment/moment.module';
import { ListViewCloseButton,
         ListViewReopenButton,
         ListViewSatisfiedButton,
         ListViewCommentButton } from '../customComponent/list/edit-cs-status-and-comment.component';
import { CommentModal } from '../customComponent/commentModal.ts';
import { ModalNavbarComponent } from '../customComponent/modal.navbar.component';
import { ParentInfo } from '../service/parentInfo';
import { PopoverPage } from '../pages/all-request/PopoverPage';

import { ForgotPasswordModal } from '../pages/login/forgotPassword';

@NgModule({
  declarations: [
    MyApp,
    closeRequestPage,
    AllRequestPage,
    TabsPage,
    LoginPage,
    ListView,
    CustomNavbar,
    ListViewCloseButton,
    ListViewCommentButton,
    ListViewReopenButton,
    ListViewSatisfiedButton,
    CommentModal,
    ModalNavbarComponent,
    newRequestModal,
    ViewComponent,
    ForgotPasswordModal,
    DashboardComponent,
    PopoverPage
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
    CustomNavbar,
    ListViewCloseButton,
    ListViewCommentButton,
    ListViewReopenButton,
    ListViewSatisfiedButton,
    CommentModal,
    ModalNavbarComponent,
    newRequestModal,
    ViewComponent,
    ForgotPasswordModal,
    DashboardComponent,
    PopoverPage
  ],
  providers: [{provide: ErrorHandler, useClass: IonicErrorHandler}, AuthService, Configuration, RequestService, CustomService, ParentInfo]
})
export class AppModule {}
