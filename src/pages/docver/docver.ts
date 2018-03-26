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
 * Generated class for the DocverPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@Component({
  selector: 'page-docver',
  templateUrl: 'docver.html',
})
export class DocverPage {
  private verifyForm: FormGroup;
  private alert;
  private user: any;

  private ijazahPhotoOptions: CameraOptions;
  private KTMPhotoOptions: CameraOptions;
  private KTPPhotoOptions: CameraOptions;

  private imgBlobIjazah: any;
  private metadataIjazah: any;

  private imgBlobKTM: any;
  private metadataKTM: any;

  private imgBlobKTP: any;
  private metadataKTP: any;

  private address: any;
  private start: any;
  private finish: any;
  private name: any;


  constructor(public navCtrl: NavController, public navParams: NavParams, public formBuilder: FormBuilder, 
    public alertCtrl: AlertController, public angularfireDatabase: AngularFireDatabase, 
    public loadingProvider: LoadingProvider, public view:ViewController, public camera: Camera, public zone: NgZone, public app: App) {

    this.ijazahPhotoOptions = {
      quality: 50,
      targetWidth: 384,
      targetHeight: 384,
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.JPEG,
      correctOrientation: true
    };

    this.KTMPhotoOptions = {
      quality: 50,
      targetWidth: 384,
      targetHeight: 384,
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.JPEG,
      correctOrientation: true
    };

    this.KTPPhotoOptions = {
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

  //Get Ijazah
  getIjazah(sourceType){
    this.ijazahPhotoOptions.sourceType = sourceType;
    this.loadingProvider.show();
    // Get picture from camera or gallery.
    this.camera.getPicture(this.ijazahPhotoOptions).then((imageData) => {
      // Process the returned imageURI.
      this.imgBlobIjazah = this.imgURItoBlob("data:image/jpeg;base64," + imageData);
      this.metadataIjazah = {
        'contentType': this.imgBlobIjazah.type
      };
    }, (err)=>{
      console.log(err);
    });
    this.loadingProvider.hide();
  }

  //Get KTP
  getKTP(sourceType){
    this.KTPPhotoOptions.sourceType = sourceType;
    this.loadingProvider.show();
    // Get picture from camera or gallery.
    this.camera.getPicture(this.KTPPhotoOptions).then((imageData) => {
      // Process the returned imageURI.
      this.imgBlobKTP = this.imgURItoBlob("data:image/jpeg;base64," + imageData);
      this.metadataKTP = {
        'contentType': this.imgBlobKTP.type
      };
    });
    this.loadingProvider.hide();
  }

  uploadPsyCard(){
    // Ask if the user wants to take a photo or choose from photo gallery.
    this.alert = this.alertCtrl.create({
      title: 'Upload Psychologist ',
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
            this.getIjazah(this.camera.PictureSourceType.PHOTOLIBRARY);
          }
        },
        {
          text: 'Take Photo',
          handler: () => {
            // Call imageProvider to process, upload, and update user photo.
            this.getIjazah(this.camera.PictureSourceType.CAMERA);
          }
        }
      ]
    }).present();
  }

  uploadKTP(){
    // Ask if the user wants to take a photo or choose from photo gallery.
    this.alert = this.alertCtrl.create({
      title: 'Upload KTP',
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
            this.getKTP(this.camera.PictureSourceType.PHOTOLIBRARY);
          }
        },
        {
          text: 'Take Photo',
          handler: () => {
            // Call imageProvider to process, upload, and update user photo.
            this.getKTP(this.camera.PictureSourceType.CAMERA);
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

  //Push Ijazah and KTP
  pushDocPhysicologist(){
    this.loadingProvider.show();
    this.angularfireDatabase.object('/accounts/' + firebase.auth().currentUser.uid).take(1).subscribe((params)=>{
      this.user = params;

      // Generate filename and upload to Firebase Storage.
      firebase.storage().ref().child('images/' + this.user.userId + '/' + this.generateFilename()).put(this.imgBlobIjazah, this.metadataIjazah).then((snapshot) => {
        let url = snapshot.metadata.downloadURLs[0];

        // Update User Data on Database.
        this.angularfireDatabase.object('/accounts/' + this.user.userId).update({
          PsyCard: url
        }).then((success) => {
          console.log("Psychologist Card updated");
            //KTP section start
            // Generate filename and upload to Firebase Storage.
            firebase.storage().ref().child('images/' + this.user.userId + '/' + this.generateFilename()).put(this.imgBlobKTP, this.metadataKTP).then((snapshot) => {
              let url = snapshot.metadata.downloadURLs[0];
              
              // Update User Data on Database.
              this.angularfireDatabase.object('/accounts/' + this.user.userId).update({
                KTP: url,
                name: this.name,
                address: this.address,
                start: this.start,
                finish: this.finish,
                docStatus: "true"
              }).then((success) => {
                console.log("KTP succesfully updated");
                this.alert = this.alertCtrl.create({
                  title: "Congratulation...",
                  subTitle: "File has been submitted, verification process will take 24 Hours",
                  buttons: ['OK']
                }).present();
                this.view.dismiss();
                this.loadingProvider.hide();
              }).catch((error) => {
                console.log("KTP error");
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
            //KTP section end
        }).catch((error) => {
          console.log("Psychologist Card error");
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
    this.pushDocPhysicologist();
  }

  back(){
    this.view.dismiss();
    console.log("modal dismissed");
  }

}
