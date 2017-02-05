import { ModalController, AlertController, ActionSheetController } from 'ionic-angular';
import { CommentModal } from '../commentModal';
import { EditRequestModal } from '../../pages/all-request/edit/editRequestModal';
// import service
import { CustomService } from '../../service/customService';
import { RequestService } from '../../service/request.service';

export class EditComplaintStatusAndComment {

  complaint;

  constructor(public modalCtrl: ModalController,
              public nl: CustomService,
              public c: RequestService,
              public actionSheetCtrl: ActionSheetController,
              public alertCtrl: AlertController) { }

  onSuccess(res) {
    this.nl.hideLoader();
    let data = res.json();
    this.updateData(data);
  }

  onError() {
    this.nl.hideLoader();
    this.nl.errMessage();
  }

  updateData(data) {
    this.complaint.statusName = data.statusName;
    this.complaint.statusId = data.statusId;
    this.complaint.statusColor = data.statusColor;
  }

  complaintClose(complaint, reason) {
    this.nl.showLoader();
    this.c.closeComplaint(complaint.id, reason).subscribe((res) => {
      if (res) {
        this.onSuccess(res);
      }
    }, (err) => {
      this.onError();
    });
  }

  openCloseModal(complaint) {
    let prompt = this.alertCtrl.create({
      title: 'Do you really want to close ?',
      enableBackdropDismiss: false,
      inputs: [{
        name: 'comment',
        placeholder: 'Write short description'
      }],
      buttons: [{
        text: 'Cancel',
        handler: data => {}
      }, {
        text: 'Save',
        handler: data => {
          if (data.comment === "") {
            this.nl.showToast("Please menation why you want to close request");
            return;
          }
          this.closeActionSheet(complaint, data);
        }
      }]
    });
    prompt.present();
  }

  closeActionSheet(complaint, closeComplaintReason) {
    let actionSheet = this.actionSheetCtrl.create({
      title: 'Are you sure you want to submit ?',
      buttons: [{
        text: 'Submit',
        icon: 'ios-paper-outline',
        handler: () => {
          this.complaintClose(complaint, closeComplaintReason);
        }
      }, {
        text: 'Cancel',
        icon: 'md-close',
        role: 'cancel',
        handler: () => {}
      }]
    });
    actionSheet.present();
  }

  openCommentModal(complaint) {
    let Comment = this.modalCtrl.create(CommentModal, {complaint: complaint});
    Comment.present();
  }

  openEditModal(complaint) {
    this.complaint = complaint;
    let edit = this.modalCtrl.create(EditRequestModal, {complaint: complaint});
    edit.onDidDismiss((res) => {
      if (!res) { return; }
      this.complaint.priorityName = res.priorityName;
      console.log("DSDSADAS", res)
      this.updateData(res);
    });
    edit.present();
  }

}
