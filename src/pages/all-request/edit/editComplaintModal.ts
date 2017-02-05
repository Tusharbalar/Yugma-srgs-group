import { Component, OnInit } from '@angular/core';
import { ViewController, ModalController, NavParams, ActionSheetController, Events } from 'ionic-angular';
import { FormGroup, FormControl } from '@angular/forms';

import * as _ from 'underscore';

// import modal
import { SearchModal } from '../../../customComponent/searchModal';

// import service
import { RequestService } from '../../../service/request.service';
import { CustomService } from '../../../service/customService';

@Component({
  selector: 'edit-complaint-modal',
  templateUrl: 'editComplaintModal.html'
})

export class EditComplaintModal implements OnInit {

  loading;
  complaint;
  complaintId;
  complaintStatusId

  employees =  [];
  priorities = [];
  editComplaint: FormGroup;

  assignedTo = "";
  priority = "";
  inProgress = {
    hasSelected: false
  };

  assignedEmployeeName: string;
  acknowledgements;
  priorityId: number;

  cmplEdit;

  // set header title
  public title: string = "Edit Request";

  constructor(private c: RequestService,
              private nl: CustomService,
              private modalCtrl: ModalController,
              private navParams: NavParams,
              public events: Events,
              private actionSheetCtrl: ActionSheetController,
              private viewCtrl: ViewController) {

  }

  ngOnInit() {
    this.getComplaint();
    this.initEditData();
    this.loadForm();
  }

  ionViewWillEnter() {
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

  selectAcknowledgement(data) {
    console.log("SASAS", data);
    this.editComplaint.value.acknowledgementId = data.id;
  }

  getComplaint() {
    this.complaint = this.navParams.get("complaint");
    this.complaintId = this.complaint.id;
    this.complaintStatusId = this.complaint.statusId;
  }

  initEditData() {
    this.assignedEmployeeName = this.complaint.assignedEmployeeName;
    this.priorityId = this.complaint.priorityId;
    if (this.complaint.statusId === 3) {
      this.inProgress = {
        hasSelected: true
      };
    }
  }

  loadForm() {
    this.editComplaint = new FormGroup({
      assignedTo: new FormControl(this.assignedEmployeeName),
      priorityId: new FormControl(this.priorityId)
    });
  }

  dismiss() {
    this.viewCtrl.dismiss();
  }

  openModal() {
    if (!this.employees) { return ; }
    let editInfo = this.modalCtrl.create(SearchModal, {info: this.employees});
    editInfo.present();
    editInfo.onDidDismiss((data) => {
      if (!data) { return; }
      this.assignedTo = data.id;
      this.setTeacher(data);
    });
  }

  setTeacher(data) {
    this.editComplaint.setValue({assignedTo : data.name,
                                 priorityId : this.editComplaint.value.priorityId});
  }

  resetTeacher() {
    this.editComplaint.reset({assignedTo : "",
                              priorityId : this.editComplaint.value.priorityId});
  }

  changesMade = false;

  // check if editComplaint form value change or not
  ngAfterViewChecked() {
    this.editComplaint.valueChanges.subscribe(data => {
      this.changesMade = true;
    });
  }

  updateComplaint() {
    this.editComplaint.value.assignedTo = this.assignedTo;
    if (this.changesMade || this.editComplaint.value.statusId) {
      if (!_.isNumber(this.editComplaint.value.assignedTo)) {
        delete this.editComplaint.value.assignedTo;
      }
      this.presentActionSheet();
    }
  }

  presentActionSheet() {
    let actionSheet = this.actionSheetCtrl.create({
      title: 'Edit Request ?',
      buttons: [{
        text: 'Submit',
        icon: 'ios-paper-outline',
        handler: () => {
          this.onSubmit();
        }
      },{
        text: 'Cancel',
        icon: 'md-close',
        role: 'cancel',
        handler: () => {
          console.log('Cancel clicked', this.editComplaint.value);
        }
      }]
    });
    actionSheet.present();
  }

  onSubmit() {
    this.nl.showLoader();
    this.c.editRequest(this.complaintId, this.editComplaint.value).subscribe((res) => {
      this.onSuccess(res.json());
    }, (err) => {
      this.onError();
    });
  }

  onSuccess(data) {
    this.nl.hideLoader();
    this.viewCtrl.dismiss(data);
    this.nl.showToast("complaint edit successfully..");
  }

  onError() {
    this.nl.hideLoader();
    this.dismiss();
    this.nl.showToast("Internal Server Error.. please try again");
  }

  setStatus(e) {
    if (e.checked) {
      this.editComplaint.value.statusId = 3;
    } else {
      delete this.editComplaint.value.statusId;
    }
  }

}
