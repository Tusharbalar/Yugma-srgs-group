import { Component, Input, OnInit, Renderer, ElementRef, ViewChild } from '@angular/core';
import { Validators, FormGroup, FormControl } from '@angular/forms';
import { ViewController, ToastController, NavParams, Content } from 'ionic-angular';

// import service
import { RequestService } from '../service/request.service';
import { CustomService } from '../service/customService';

@Component({
  selector: 'comment',
  template: `
    <ion-header>
      <nl-modal-navbar [title]="title" [complaint]="complaint"></nl-modal-navbar>
    </ion-header>
    <ion-content id="chat" class="csChatBox" >
      <ion-list class="no-comment" *ngIf="emptyComments">
        <h3>No Comments</h3>
      </ion-list>
      <ion-spinner class="circle-spinner" *ngIf="!hasData"></ion-spinner>
      <div  class="message-box csTransparent" *ngFor="let m of comments" [ngClass]="{'mine': m.employeeId != null}" no-margin>
        <div no-padding class="csMyComment">
          <h3>{{ m.comment }}</h3>
        </div>
        <div class="csCommentTime">{{m.employeeNickName}}{{m.parentName}} {{ m.createdAt | amCalendar }}</div>
      </div>
      <ion-spinner class="loader"  name="dots" *ngIf="!notPost"></ion-spinner>
    </ion-content>
    <ion-footer keyboard-attach class="bar-stable" #commentBtn>
      <form class="comment-box" [formGroup]="commentForm" (ngSubmit)="postComment()" novalidate>
        <ion-grid>
          <ion-row>
            <ion-col width-80>
              <ion-textarea rows="2" class="csCommentInput" type="text" formControlName="comment" placeholder=" Write comment..."></ion-textarea>
            </ion-col>
            <ion-col>
              <button class="csCommentSend" color="primary" ion-button icon-only item-right type="submit" [disabled]="commentForm.invalid || !notPost">
                <ion-icon name="md-send" role="img"></ion-icon>
              </button>
            </ion-col>
          </ion-row>
        </ion-grid>
      </form>
    </ion-footer>
  `
})

export class CommentModal implements OnInit {

  @Input() complaint;

  commentForm: FormGroup;
  comment: any;
  comments: any[];
  emptyComments = false;
  complaintId: number;
  hasData = false;
  notPost = true;

  title = "COMMENTS";

  @ViewChild(Content) content: Content;
  @ViewChild('commentBtn') el : ElementRef;

  constructor(private viewCtrl: ViewController,
              private nl: CustomService,
              private c: RequestService,
              private navParams: NavParams,
              private renderer: Renderer,
              private elementRef: ElementRef,
              private toastCtrl: ToastController) {

  }

  ngOnInit() {
    let complaint = this.navParams.get('complaint');
    this.complaintId = complaint.id;
    console.log(complaint)
    this.loadComments();
    this.commentForm = new FormGroup({
      comment: new FormControl('', [Validators.required])
    });
    if (complaint.statusId === 4 || complaint.statusId === 6 || complaint.statusId === 7) {
      this.renderer.setElementStyle(this.el.nativeElement, "visibility", 'hidden');
      let msg = "You can't comment on it any more, may be your complaint status is closed, satisfied or unresolved";
      this.nl.showToast(msg);
    }
  }

  showToastMessage() {
    let toast = this.toastCtrl.create({
      message: "You can't comment on it any more, may be your complaint status is closed or satisfied",
      duration: 3000,
      showCloseButton: true,
      closeButtonText: "Ok",
      dismissOnPageChange: true
    });
    toast.onDidDismiss(() => {
      toast.dismiss();
    });
    toast.present();
  }

  scrollToBottom(){
    this.content.scrollTo(0, 700, 200);
  }

  loadComments() {
    this.c.getComments(this.complaintId).subscribe((response) => {
      if (response.status === 204) {
        this.hasData = true;
        this.emptyComments = true;
        this.comments = [];
      } else {
        this.hasData = true;
        this.emptyComments = false;
        this.comments = response.json().reverse();
        this.scrollToBottom();
      }
    });
  }

  dismiss() {
    this.viewCtrl.dismiss();
  }

  postComment() {
    this.content.scrollToBottom();
    if (!this.commentForm.valid) {
      console.log("not valid form");
    } else {
      this.notPost = false;
      this.emptyComments = false;
      this.c.postComment(this.complaintId, this.commentForm.value).subscribe((res) => {
        this.notPost = true;
        if (!this.comments) { this.comments = []; }
        this.comments.push({
          createdAt: new Date(),
          employeeId: localStorage.getItem("id"),
          comment: this.commentForm.value.comment
        });
        this.commentForm.reset();
      }, (err) => {
        this.nl.errMessage();
        this.notPost = true;
        this.commentForm.reset();
      });
    }
  }

}
