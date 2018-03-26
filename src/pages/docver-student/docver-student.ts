import { HomePage } from './../home/home';
import { TimeLinePage } from './../time-line/time-line';
import { TabsPage } from './../tabs/tabs';
import { Camera, CameraOptions } from '@ionic-native/camera';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Component, NgZone } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, App } from 'ionic-angular';
import { Validator } from '../../validator';
import { Validators } from '@angular/forms';
import * as firebase from 'firebase';
import { AngularFireDatabase } from 'angularfire2/database';
import { LoadingProvider } from '../../providers/loading';
import { ViewController } from 'ionic-angular';

/**
 * Generated class for the DocverStudentPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@Component({
  selector: 'page-docver-student',
  templateUrl: 'docver-student.html',
})
export class DocverStudentPage {
  private verifyForm: FormGroup;
  private alert;
  private user: any;

  private KTMPhotoOptions: CameraOptions;
  private KTPPhotoOptions: CameraOptions;

  private imgBlobKTM: any;
  private metadataKTM: any;

  private imgBlobKTP: any;
  private metadataKTP: any;

  private university: any;
  private address: any;

  private name: any;
  private nim: any;
  private city: any;


  constructor(public navCtrl: NavController, public navParams: NavParams, public formBuilder: FormBuilder, 
    public alertCtrl: AlertController, public angularfireDatabase: AngularFireDatabase, 
    public loadingProvider: LoadingProvider, public view:ViewController, public camera: Camera, public zone: NgZone, public app: App) {

    this.KTMPhotoOptions = {
      quality: 50,
      targetWidth: 384,
      targetHeight: 384,
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.JPEG,
      correctOrientation: true
    };

    this.verifyForm = formBuilder.group({
      address: Validators.required,
      time: Validators.required
    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad DocverPage');
  }

  // Function to convert dataURI to Blob needed by Firebase
  imgURItoBlob(dataURI) {
    var binary = atob(dataURI.split(',')[1]);
    var mimeString = dataURI.split(',')[0].split(':')[1].split(';')[0];
    var array = [];
    for (var i = 0; i < binary.length; i++) {
      array.push(binary.charCodeAt(i));
    }
    return new Blob([new Uint8Array(array)], {
      type: mimeString
    });
  }

  //Get KTM
  getKTM(sourceType){
    this.KTMPhotoOptions.sourceType = sourceType;
    this.loadingProvider.show();
    // Get picture from camera or gallery.
    this.camera.getPicture(this.KTMPhotoOptions).then((imageData) => {
      // Process the returned imageURI.
      this.imgBlobKTM = this.imgURItoBlob("data:image/jpeg;base64," + imageData);
      this.metadataKTM = {
        'contentType': this.imgBlobKTM.type
      };
    }, (err)=>{
      console.log(err);
    });
    this.loadingProvider.hide();
  }

  uploadKTM(){
    // Ask if the user wants to take a photo or choose from photo gallery.
    this.alert = this.alertCtrl.create({
      title: 'Upload KTM',
      message: 'Do you want to take a photo or choose from your photo gallery?',
      buttons: [
        {
          text: 'Cancel',
          handler: data => { }
        },
        {
          text: 'Choose from Gallery',
          handler: () => {
            // Call imageProvider to process, upload, and update user photo.
            this.getKTM(this.camera.PictureSourceType.PHOTOLIBRARY);
          }
        },
        {
          text: 'Take Photo',
          handler: () => {
            // Call imageProvider to process, upload, and update user photo.
            this.getKTM(this.camera.PictureSourceType.CAMERA);
          }
        }
      ]
    }).present();
  }

  // Generate a random filename of length for the image to be uploaded
  generateFilename() {
    var length = 8;
    var text = "";
    var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    for (var i = 0; i < length; i++) {
      text += possible.charAt(Math.floor(Math.random() * possible.length));
    }
    return text + ".jpg";
  }

  //Push KTM
  pushDocPhysicolStudent(){
    this.loadingProvider.show();
    this.angularfireDatabase.object('/accounts/' + firebase.auth().currentUser.uid).take(1).subscribe((params)=>{
      this.user = params;

      // Generate filename and upload to Firebase Storage.
      firebase.storage().ref().child('images/' + this.user.userId + '/' + this.generateFilename()).put(this.imgBlobKTM, this.metadataKTM).then((snapshot) => {
        let url = snapshot.metadata.downloadURLs[0];

        // Update User Data on Database.
        this.angularfireDatabase.object('/accounts/' + this.user.userId).update({
          KTM: url,
          university: this.university,
          name: this.name,
          nim: this.nim,
          city: this.city,
          docStatus: "true"
        }).then((success) => {
          console.log("KTM succesfully updated");
          this.alert = this.alertCtrl.create({
            title: "Congratulation...",
            subTitle: "File has been submitted, verification process will take 24 Hours",
            buttons: ['OK']
          }).present();
          this.view.dismiss();
          this.loadingProvider.hide();
        }).catch((error) => {
          console.log("KTM error");
          this.loadingProvider.hide();
        });

      }).catch((error) => {
        this.loadingProvider.hide();
        this.alertCtrl.create({
          title: "Error",
          subTitle: "Something went wrong",
          buttons: ['OK']
        }).present();
      });
    });
  }

  submit(){
    //Push to realtime database
    this.pushDocPhysicolStudent();
  }

  back(){
    this.view.dismiss();
    console.log("modal dismissed");
  }

}
