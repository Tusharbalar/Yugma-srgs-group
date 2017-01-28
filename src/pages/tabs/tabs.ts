import { Component } from '@angular/core';

import { AllRequestPage } from '../all-request/request';
import { closeRequestPage } from '../close-request/request';

@Component({
  templateUrl: 'tabs.html'
})

export class TabsPage {
  // this tells the tabs component which Pages
  // should be each tab's root Page
  tab1Root: any = AllRequestPage;
  tab2Root: any = closeRequestPage;

  constructor() {

  }
}
