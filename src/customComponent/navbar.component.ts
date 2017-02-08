import { Component, Input } from '@angular/core';

@Component({
  selector: 'nl-navbar',
  template: `
  <ion-toolbar color="primary">
    <ion-navbar color="primary">
      <button ion-button menuToggle>
        <ion-icon name="menu"></ion-icon>
      </button>
      <ion-title >
        <span>{{title | uppercase}}</span>
      </ion-title>
      <ion-buttons end>
        <ng-content></ng-content>
      </ion-buttons>
    </ion-navbar>
  </ion-toolbar>
  `,
  styles: [`

  `]
})

export class CustomNavbar {

  @Input() title: string;

  constructor() {

  }

}
