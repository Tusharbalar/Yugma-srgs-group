import { Component, OnInit } from '@angular/core';
import { ModalController, AlertController, ActionSheetController, NavParams } from 'ionic-angular';
import { ViewController } from 'ionic-angular';

// import base class
import { EditComplaintStatusAndComment } from '../../../customComponent/list/edit-cs-status-and-comment.class';

// import service
import { CustomService } from '../../../service/customService';
import { RequestService } from '../../../service/request.service';

@Component({
  selector: 'nl-view',
  templateUrl: 'view.component.html'
})

export class ViewComponent extends EditComplaintStatusAndComment implements OnInit {

  complaint;
  title: string = "VIEW REQUEST";

  constructor(public modalCtrl: ModalController,
              public nl: CustomService,
              public c: RequestService,
              public actionSheetCtrl: ActionSheetController,
              public alertCtrl: AlertController,
              private navParams: NavParams,
              private viewCtrl: ViewController) {
    super(modalCtrl, nl, c, actionSheetCtrl, alertCtrl);
  }

  ngOnInit() {
    this.complaint = this.navParams.get('request');
    console.log("DSADD", this.complaint)
  }

}
