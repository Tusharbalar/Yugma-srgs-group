import { NgModule, ErrorHandler } from '@angular/core';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';
import { AllRequestPage } from '../pages/all-request/request';
import { LoginPage } from '../pages/login/login';

import { AuthService } from '../service/auth.service';
import { RequestService } from '../service/request.service';
import { Configuration } from '../service/app.constants';

import { DashboardComponent } from '../pages/dashboard/dashboard.component';

import { ListView } from '../customComponent/list/listview.component';
import { CustomNavbar } from '../customComponent/navbar.component.ts';

import { ViewComponent } from '../pages/all-request/view/viewRequestModal';
import { CustomService } from '../service/customService';
import { MomentModule } from 'angular2-moment/moment.module';
import { ListViewCloseButton,
         ListViewEditButton,
         ListViewCommentButton } from '../customComponent/list/edit-cs-status-and-comment.component';
import { CommentModal } from '../customComponent/commentModal.ts';
import { ModalNavbarComponent } from '../customComponent/modal.navbar.component';
import { PopoverPage } from '../pages/all-request/PopoverPage';
import { AccountPage } from '../pages/account/account';
import { resetPasswordModal } from '../pages/account/resetPassword/resetPassword';
import { EditRequestModal } from '../pages/all-request/edit/editRequestModal';
import { SearchModal } from '../customComponent/searchModal';

import { ForgotPasswordModal } from '../pages/login/forgotPassword';

@NgModule({
  declarations: [
    MyApp,
    AllRequestPage,
    LoginPage,
    ListView,
    CustomNavbar,
    ListViewCloseButton,
    ListViewCommentButton,
    ListViewEditButton,
    CommentModal,
    ModalNavbarComponent,
    ViewComponent,
    ForgotPasswordModal,
    DashboardComponent,
    PopoverPage,
    AccountPage,
    resetPasswordModal,
    EditRequestModal,
    SearchModal
  ],
  imports: [
    MomentModule,
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    AllRequestPage,
    LoginPage,
    ListView,
    CustomNavbar,
    ListViewCloseButton,
    ListViewCommentButton,
    ListViewEditButton,
    CommentModal,
    ModalNavbarComponent,
    ViewComponent,
    ForgotPasswordModal,
    DashboardComponent,
    PopoverPage,
    AccountPage,
    resetPasswordModal,
    EditRequestModal,
    SearchModal
  ],
  providers: [{provide: ErrorHandler, useClass: IonicErrorHandler}, AuthService, Configuration, RequestService, CustomService]
})
export class AppModule {}
