import { Component, OnInit } from '@angular/core';
import { ViewController, ModalController, NavParams, ActionSheetController, Events } from 'ionic-angular';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import * as _ from 'underscore';

// import modal
import { SearchModal } from '../../../customComponent/searchModal';

// import service
import { RequestService } from '../../../service/request.service';
import { CustomService } from '../../../service/customService';

@Component({
  selector: 'edit-request-modal',
  templateUrl: 'editRequestModal.html'
})

export class EditRequestModal implements OnInit {

  constructor(private c: RequestService,
              private nl: CustomService,
              private modalCtrl: ModalController,
              private navParams: NavParams,
              public events: Events,
              private actionSheetCtrl: ActionSheetController,
              private viewCtrl: ViewController) {

  }

  request;
  requestId;
  priorityId;
  requestStatusId;
  assignedEmployeeName;
  assignedEmployeeId;
  acknowledgementId;
  dueDate = false;
  comments = false;
  comment = [];

  editRequest: FormGroup;

  priorities;
  employees;
  acknowledgements;

  employeeData;

  ngOnInit() {
    this.getRequest();
    this.loadForm();
  }

  getRequest() {
    this.request = this.navParams.get("request");
    this.requestId = this.request.id;
    this.requestStatusId = this.request.statusId;

    this.priorityId = this.request.priorityId;
    this.assignedEmployeeName = this.request.assignedEmployeeName;
    this.employeeData = {
      id : this.request.assignedEmployeeId
    }
    this.acknowledgementId = JSON.parse(this.request.acknowledgementId);

    if (this.acknowledgementId === 2) {
      this.dueDate = true;
      this.comments = false;
    } else if(this.acknowledgementId === 3) {
      this.dueDate = false;
      this.comments = true;
    }

    this.priorities = JSON.parse(localStorage.getItem("priorities"));
    this.employees = JSON.parse(localStorage.getItem("employees"));
    this.acknowledgements = JSON.parse(localStorage.getItem("acknowledgements"));

    if (this.priorities === null) {
      this.getEditInfo();
    }
  }

  getEditInfo() {
    this.nl.showLoader();
    this.c.editInfo().subscribe((res) => {
      this.nl.hideLoader();
      let jsonres = res.json();
      this.priorities = jsonres.priorities;
      this.employees = jsonres.employees;
      this.acknowledgements = jsonres.acknowledgements;
    }, (err) => {
      this.onError();
    });
  }

  onError() {
    this.nl.hideLoader();
    this.dismiss();
    this.nl.errMessage();
  }

  loadForm() {
    this.editRequest = new FormGroup({
      assignedTo: new FormControl(this.assignedEmployeeName),
      statusId: new FormControl(this.priorityId),
      inProgress: new FormControl(false),
      acknowledgementId: new FormControl(this.acknowledgementId, [Validators.required]),
      revisedDueDate: new FormControl(this.request.revisedDueDate),
      comment: new FormControl(this.request.comment)
    });
  }

  dismiss(): void {
    this.viewCtrl.dismiss(this.request);
  }

  openModal() {
    if (!this.employees) { return ; }
    let editInfo = this.modalCtrl.create(SearchModal, {info: this.employees});
    editInfo.present();
    editInfo.onDidDismiss((data) => {
      if (!data) { return; }
      this.employeeData = data;
      this.editRequest.patchValue({"assignedTo": data.name});
    });
  }

  resetEmployee() {
    this.editRequest.patchValue({"assignedTo": this.assignedEmployeeName});
  }

  updateRequest() {
    let actionSheet = this.actionSheetCtrl.create({
      title: 'Edit Request ?',
      buttons: [{
        text: 'Submit',
        icon: 'ios-paper-outline',
        handler: () => {
          this.onSubmit();
        }
      }, {
        text: 'Cancel',
        icon: 'md-close',
        role: 'cancel',
        handler: () => {
          console.log('Cancel clicked');
        }
      }]
    });
    actionSheet.present();
  }

  onSubmit() {
    this.editRequest.value.assignedTo = this.employeeData.id;
    if (this.editRequest.value.statusId) {
      this.editRequest.value.statusId = "3";
    }

    this.nl.showLoader();
    this.c.editRequest(this.requestId, this.editRequest.value).subscribe((res) => {
      this.onSuccess(res.json());
    }, (err) => {
      this.onError();
    });
  }

  onSuccess(data) {
    this.nl.hideLoader();
    this.viewCtrl.dismiss(data);
    this.nl.showToast("Request edit successfully..");
  }

}
