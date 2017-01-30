import { Component, OnInit } from '@angular/core';
import { ViewController, ToastController, ActionSheetController } from 'ionic-angular';

import { ParentInfo } from '../../../service/parentInfo';

import { Validators, FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { RequestService } from '../../../service/request.service';
import { CustomService } from '../../../service/customService';
import * as _ from 'underscore';

@Component({
  selector: 'new-request-modal',
  templateUrl: 'newRequestModal.html'
})

export class newRequestModal implements OnInit {

  public students;
  public student;
  public standardId;
  public studentId;
  public categories;
  public childCategories;
  public category;
  public teachers;
  public againstEmployeeId;
  public childCategory;
  public child;
  public title = [];
  public desc = [];

  newComplaint: FormGroup;
  myForm: FormGroup;

  headerTitle: string;

  constructor(public viewCtrl: ViewController,
              public parentInfo: ParentInfo,
              public toastCtrl: ToastController,
              public formBuilder: FormBuilder,
              public nl: CustomService,
              public c: RequestService,
              public actionSheetCtrl: ActionSheetController) {

  }

  complaint = {
    anonymous: false
  }

  selectChild(student) {
    if (student) {
      this.studentId = student.id;
      this.standardId = student.standardId;
    }
  }

  ngOnInit() {
    this.loadForm();
    this.nl.showToast("All fields are mandatory to create a new complaint");
  }

  loadForm() {
    this.newComplaint = this.formBuilder.group({
      category: ['', Validators.required],
      childCategory: ['', Validators.required],
      title: ['', [Validators.required, Validators.maxLength(50)]],
      description: ['', [Validators.required, Validators.maxLength(200)]]
    });
  }

  ionViewWillEnter() {
    this.nl.showLoader();
    this.c.getCategories().subscribe((categories) => {
      this.nl.hideLoader();
      this.categories = categories.json();
    }, (err) => {
      this.nl.hideLoader();
      this.nl.errMessage();
      this.dismiss();
    });
  }

  dismiss() {
    this.viewCtrl.dismiss();
  }

  public getChildCategory(categoryId) {
    for(let subCategory of this.categories) {
      if (subCategory.id === categoryId) {
        this.childCategories = subCategory.childCategory;
      }
    }
  }

  setCategory(category) {

    if (category && category.depth === 1 && category.childCategory.length === 0) {

      this.newComplaint.addControl('againstEmployeeId', new FormControl('', [Validators.required]));

      if (this.newComplaint.contains("childCategory")) {
        this.newComplaint.removeControl("childCategory");
      }

      delete this.childCategories;
    } else if (category) {
      if (!this.newComplaint.contains("childCategory")) {
        this.newComplaint.addControl('childCategory', new FormControl('', [Validators.required]));
      }
      this.newComplaint.removeControl("againstEmployeeId");
      delete this.teachers;
      this.getChildCategory(category.id);
    }

  }

  setTeacher(teacherId) {
    console.log("teacherId", teacherId)
  }

  presentActionSheet(newComplaint) {
    let actionSheet = this.actionSheetCtrl.create({
      title: 'Are you sure you want to submit ?',
      buttons: [
        {
          text: 'Submit',
          icon: 'ios-paper-outline',
          handler: () => {
            this.nl.showLoader();
            this.c.saveRequest(newComplaint).subscribe((complaint) => {
              this.nl.hideLoader();
              this.viewCtrl.dismiss(complaint.json());
            }, (err) => {
              this.nl.hideLoader();
              this.viewCtrl.dismiss();
              this.nl.errMessage();
            });
          }
        },{
          text: 'Cancel',
          icon: 'md-close',
          role: 'cancel',
          handler: () => {
            console.log('Cancel clicked');
          }
        }
      ]
    });
    actionSheet.present();
  }

  saveComplaint(){
    if (this.newComplaint.invalid) {
      console.log("Complaint invalid")
    } else {

      let newComplaint = _.extend(this.newComplaint.value, {
        againstCategoryId: this.newComplaint.value.category.id,
        studentId: this.newComplaint.value.student.id
      });
      newComplaint = _.pick(newComplaint, function(value, key, object) {
        return _.isNumber(value) || _.isString(value);
      });
      newComplaint.anonymous = this.newComplaint.value.anonymous;
      if (newComplaint.childCategory) {
        newComplaint.againstCategoryId = newComplaint.childCategory;
        delete newComplaint.childCategory;
      }
      this.presentActionSheet(newComplaint);

    }
  }

}
