import { Component } from '@angular/core';
import { AlertController, IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the Payment2Page page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-payment2',
  templateUrl: 'payment2.html',
})
export class Payment2Page {
  private alert;
  
  constructor(public alertCtrl:AlertController, public navCtrl: NavController, public navParams: NavParams) {
  }


  imageUpload(){
       this.alert = this.alertCtrl.create({
      title: 'Upload bukti transfer',
      message: 'Harap bukti transfer yang diupload benar.',
      buttons: [
        {
          text: 'Cancel',
          handler: data => { }
        },
        {
          text: 'Choose from Gallery',
          handler: () => {
            // Call imageProvider to process, upload, and update user photo.
            // this.imageProvider.setProfilePhoto(this.user, this.camera.PictureSourceType.PHOTOLIBRARY);
          }
        },
        {
          text: 'Take Photo',
          handler: () => {
            // Call imageProvider to process, upload, and update user photo.
            // this.imageProvider.setProfilePhoto(this.user, this.camera.PictureSourceType.CAMERA);
          }
        }
      ]
    }).present();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad Payment2Page');
  }

}
