import { Component, Input } from '@angular/core';
import { ModalController, AlertController, ActionSheetController } from 'ionic-angular';
import { EditComplaintStatusAndComment } from './edit-cs-status-and-comment.class';

import { EditRequestModal } from '../../pages/all-request/edit/editRequestModal';

// import service
import { CustomService } from '../../service/customService';
import { RequestService } from '../../service/request.service';

@Component({
  selector: 'nl-close-button',
  template: `
    <div style="height:100%;">
      <button ion-button color="secondary" (click)="openCloseModal(complaint)" *ngIf="complaint.statusId != 6 && complaint.statusId != 4  && complaint.statusId != 7">
        <ion-icon name="md-close"></ion-icon>
        Close
      </button>
    </div>
  `
})

export class ListViewCloseButton extends EditComplaintStatusAndComment {

  @Input() complaint;
  @Input('master') masterName: string;

  constructor(public modalCtrl: ModalController,
              public nl: CustomService,
              public c: RequestService,
              public actionSheetCtrl: ActionSheetController,
              public alertCtrl: AlertController) {
    super(modalCtrl, nl, c, actionSheetCtrl, alertCtrl);
  }

}

@Component({
  selector: 'nl-comment-button',
  template: `
    <div style="height:100%;">
      <button ion-button color="cool" (click)="openCommentModal(complaint)">
        <ion-icon name="ios-chatbubbles"></ion-icon>
        Comments
      </button>
    </div>
  `
})

export class ListViewCommentButton extends EditComplaintStatusAndComment {

  @Input() complaint;
  @Input('master') masterName: string;

  constructor(public modalCtrl: ModalController,
              public nl: CustomService,
              public c: RequestService,
              public actionSheetCtrl: ActionSheetController,
              public alertCtrl: AlertController) {
    super(modalCtrl, nl, c, actionSheetCtrl, alertCtrl);
  }

}

@Component({
  selector: 'nl-edit-button',
  template: `
    <div style="height:100%;">
      <button ion-button color="edit" (click)="openEditModal(complaint)" *ngIf="complaint.statusId != 6 && complaint.statusId != 4  && complaint.statusId != 7">
        <ion-icon name="ios-create"></ion-icon>
        Edit
      </button>
    </div>
  `
})

export class ListViewEditButton {

  @Input() complaint;
  @Input('master') masterName: string;

  constructor(public modalCtrl: ModalController,
              public nl: CustomService,
              public c: RequestService,
              public actionSheetCtrl: ActionSheetController,
              public alertCtrl: AlertController) {

  }

  updateData(data) {
    this.complaint.statusName = data.statusName;
    this.complaint.statusId = data.statusId;
    this.complaint.statusColor = data.statusColor;
  }

  openEditModal(complaint) {
    this.complaint = complaint;
    let edit = this.modalCtrl.create(EditRequestModal, {request: complaint});
    edit.onDidDismiss((res) => {
      if (!res) { return; }
      this.updateData(res);
    });
    edit.present();
  }

}
