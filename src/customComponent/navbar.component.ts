import { Component, Input } from '@angular/core';

@Component({
  selector: 'nl-navbar',
  template: `
    <ion-navbar color="primary">
      <ion-title >
        <span>{{title | uppercase}}</span>
      </ion-title>
      <ion-buttons end>
        <ng-content></ng-content>
      </ion-buttons>
    </ion-navbar>
  `,
  styles: [`

  `]
})

export class CustomNavbar {

  @Input() title: string;

  constructor() {

  }

}
