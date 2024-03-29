import { App } from 'ionic-angular';
import { Injectable } from '@angular/core';
import { AlertProvider } from './alert';
import { LoadingProvider } from './loading';
import { Camera, CameraOptions } from '@ionic-native/camera';
import * as firebase from 'firebase';
import { AngularFireDatabase } from 'angularfire2/database';

@Injectable()
export class ImageProvider {
  // Image Provider
  // This is the provider class for most of the image processing including uploading images to Firebase.
  // Take note that the default function here uploads the file in .jpg. If you plan to use other encoding types, make sure to
  // set the encodingType before uploading the image on Firebase.
  // Example for .png:
  // data:image/jpeg;base64 -> data:image/png;base64
  // generateFilename to return .png
  private profilePhotoOptions: CameraOptions;
  private photoMessageOptions: CameraOptions;
  private groupPhotoOptions: CameraOptions;

  private ijazahPhotoOptions: CameraOptions;
  private KTMPhotoOptions: CameraOptions;
  private KTPPhotoOptions: CameraOptions;

  private imgBlobIjazah: any;
  private metadataIjazah: any;

  private imgBlobKTM: any;
  private metadataKTM: any;

  private imgBlobKTP: any;
  private metadataKTP: any;
  // All files to be uploaded on Firebase must have DATA_URL as the destination type.
  // This will return the imageURI which can then be processed and uploaded to Firebase.
  // For the list of cameraOptions, please refer to: https://github.com/apache/cordova-plugin-camera#module_camera.CameraOptions

  constructor(public angularfireDatabase: AngularFireDatabase, public alertProvider: AlertProvider, public loadingProvider: LoadingProvider, public camera: Camera, public app: App) {
    console.log("Initializing Image Provider");
    this.profilePhotoOptions = {
      quality: 50,
      targetWidth: 384,
      targetHeight: 384,
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.JPEG,
      correctOrientation: true
    };

    this.photoMessageOptions = {
      quality: 50,
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.JPEG,
      correctOrientation: true
    };

    this.groupPhotoOptions = {
      quality: 50,
      targetWidth: 384,
      targetHeight: 384,
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.JPEG,
      correctOrientation: true
    };
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

  //Get Ijazah
  getIjazah(sourceTypeIjazah){
    this.ijazahPhotoOptions.sourceType = sourceTypeIjazah;
    this.loadingProvider.show();
    // Get picture from camera or gallery.
    this.camera.getPicture(this.ijazahPhotoOptions).then((imageData) => {
      // Process the returned imageURI.
      this.imgBlobIjazah = this.imgURItoBlob("data:image/jpeg;base64," + imageData);
      this.metadataIjazah = {
        'contentType': this.imgBlobIjazah.type
      };
    });
    this.loadingProvider.hide();
  }

  //Get KTM
  getKTM(sourceTypeKTM){
    this.KTMPhotoOptions.sourceType = sourceTypeKTM;
    this.loadingProvider.show();
    // Get picture from camera or gallery.
    this.camera.getPicture(this.KTMPhotoOptions).then((imageData) => {
      // Process the returned imageURI.
      this.imgBlobKTM = this.imgURItoBlob("data:image/jpeg;base64," + imageData);
      this.metadataKTM = {
        'contentType': this.imgBlobKTM.type
      };
    });
    this.loadingProvider.hide();
  }

  //Get KTP
  getKTP(sourceTypeKTP){
    this.KTPPhotoOptions.sourceType = sourceTypeKTP;
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

  //Push Ijazah and KTP
  pushDocPhysicologist(user){
    this.loadingProvider.show();
      // Generate filename and upload to Firebase Storage.
      firebase.storage().ref().child('images/' + user.userId + '/' + this.generateFilename()).put(this.imgBlobIjazah, this.metadataIjazah).then((snapshot) => {
        let url = snapshot.metadata.downloadURLs[0];

        // Update User Data on Database.
        this.angularfireDatabase.object('/accounts/' + user.userId).update({
          Ijazah: url
        }).then((success) => {
          console.log("Ijazah succesfully updated");
            //KTP section start
            // Generate filename and upload to Firebase Storage.
            firebase.storage().ref().child('images/' + user.userId + '/' + this.generateFilename()).put(this.imgBlobKTP, this.metadataKTP).then((snapshot) => {
              let url = snapshot.metadata.downloadURLs[0];
      
              // Update User Data on Database.
              this.angularfireDatabase.object('/accounts/' + user.userId).update({
                KTP: url
              }).then((success) => {
                console.log("KTP succesfully updated");
                this.loadingProvider.hide();
              }).catch((error) => {
                console.log("KTP error");
                this.loadingProvider.hide();
              });
      
            }).catch((error) => {
              this.loadingProvider.hide();
              this.alertProvider.showErrorMessage('image/error-image-upload');
            });
            //KTP section end
        }).catch((error) => {
          console.log("Ijazah error");
          this.loadingProvider.hide();
        });

      }).catch((error) => {
        this.loadingProvider.hide();
        this.alertProvider.showErrorMessage('image/error-image-upload');
      });
  }

  //push KTM and KTP
  pushDocStudPsy(user){
    this.loadingProvider.show();
    // Generate filename and upload to Firebase Storage.
    firebase.storage().ref().child('images/' + user.userId + '/' + this.generateFilename()).put(this.imgBlobKTM, this.metadataKTM).then((snapshot) => {
      let url = snapshot.metadata.downloadURLs[0];

      // Update User Data on Database.
      this.angularfireDatabase.object('/accounts/' + user.userId).update({
        KTM: url
      }).then((success) => {
        console.log("KTM succesfully updated");
          //KTP section start
          // Generate filename and upload to Firebase Storage.
          firebase.storage().ref().child('images/' + user.userId + '/' + this.generateFilename()).put(this.imgBlobKTP, this.metadataKTP).then((snapshot) => {
            let url = snapshot.metadata.downloadURLs[0];
    
            // Update User Data on Database.
            this.angularfireDatabase.object('/accounts/' + user.userId).update({
              KTP: url
            }).then((success) => {
              console.log("KTP succesfully updated");
              this.loadingProvider.hide();
            }).catch((error) => {
              console.log("KTP error");
              this.loadingProvider.hide();
            });
    
          }).catch((error) => {
            this.loadingProvider.hide();
            this.alertProvider.showErrorMessage('image/error-image-upload');
          });
          //KTP section end
      }).catch((error) => {
        console.log("KTM error");
        this.loadingProvider.hide();
      });

    }).catch((error) => {
      this.loadingProvider.hide();
      this.alertProvider.showErrorMessage('image/error-image-upload');
    });
  }
  


  // Set ProfilePhoto given the user and the cameraSourceType.
  // This function processes the imageURI returned and uploads the file on Firebase,
  // Finally the user data on the database is updated.
  setProfilePhoto(user, sourceType) {
    this.profilePhotoOptions.sourceType = sourceType;
    this.loadingProvider.show();
    // Get picture from camera or gallery.
    this.camera.getPicture(this.profilePhotoOptions).then((imageData) => {
      // Process the returned imageURI.
      let imgBlob = this.imgURItoBlob("data:image/jpeg;base64," + imageData);
      let metadata = {
        'contentType': imgBlob.type
      };
      // Generate filename and upload to Firebase Storage.
      firebase.storage().ref().child('images/' + user.userId + '/' + this.generateFilename()).put(imgBlob, metadata).then((snapshot) => {
        // Delete previous profile photo on Storage if it exists.
        this.deleteImageFile(user.img);
        // URL of the uploaded image!
        let url = snapshot.metadata.downloadURLs[0];
        let profile = {
          displayName: user.name,
          photoURL: url
        };
        // Update Firebase User.
        firebase.auth().currentUser.updateProfile(profile)
          .then((success) => {
            // Update User Data on Database.
            this.angularfireDatabase.object('/psg/' + user.userId).update({
              img: url
            }).then((success) => {
              this.loadingProvider.hide();
              this.alertProvider.showProfileUpdatedMessage();
            }).catch((error) => {
              this.loadingProvider.hide();
              this.alertProvider.showErrorMessage('profile/error-change-photo');
            });
          })
          .catch((error) => {
            this.loadingProvider.hide();
            this.alertProvider.showErrorMessage('profile/error-change-photo');
          });
      }).catch((error) => {
        this.loadingProvider.hide();
        this.alertProvider.showErrorMessage('image/error-image-upload');
      });
    }).catch((error) => {
      this.loadingProvider.hide();
    });
  }

  // Upload and set the group object's image.
  setGroupPhoto(group, sourceType) {
    this.groupPhotoOptions.sourceType = sourceType;
    this.loadingProvider.show();
    // Get picture from camera or gallery.
    this.camera.getPicture(this.groupPhotoOptions).then((imageData) => {
      // Process the returned imageURI.
      let imgBlob = this.imgURItoBlob("data:image/jpeg;base64," + imageData);
      let metadata = {
        'contentType': imgBlob.type
      };
      firebase.storage().ref().child('images/' + firebase.auth().currentUser.uid + '/' + this.generateFilename()).put(imgBlob, metadata).then((snapshot) => {
        this.deleteImageFile(group.img);
        // URL of the uploaded image!
        let url = snapshot.metadata.downloadURLs[0];
        group.img = url;
        this.loadingProvider.hide();
      }).catch((error) => {
        this.loadingProvider.hide();
        this.alertProvider.showErrorMessage('image/error-image-upload');
      });
    }).catch((error) => {
      this.loadingProvider.hide();
    });
  }

  // Set group photo and return the group object as promise.
  setGroupPhotoPromise(group, sourceType): Promise<any> {
    return new Promise(resolve => {
      this.groupPhotoOptions.sourceType = sourceType;
      this.loadingProvider.show();
      // Get picture from camera or gallery.
      this.camera.getPicture(this.groupPhotoOptions).then((imageData) => {
        // Process the returned imageURI.
        let imgBlob = this.imgURItoBlob("data:image/jpeg;base64," + imageData);
        let metadata = {
          'contentType': imgBlob.type
        };
        firebase.storage().ref().child('images/' + firebase.auth().currentUser.uid + '/' + this.generateFilename()).put(imgBlob, metadata).then((snapshot) => {
          this.deleteImageFile(group.img);
          // URL of the uploaded image!
          let url = snapshot.metadata.downloadURLs[0];
          group.img = url;
          this.loadingProvider.hide();
          resolve(group);
        }).catch((error) => {
          this.loadingProvider.hide();
          this.alertProvider.showErrorMessage('image/error-image-upload');
        });
      }).catch((error) => {
        this.loadingProvider.hide();
      });
    });
  }

  //Delete the image given the url.
  deleteImageFile(path) {
    var fileName = path.substring(path.lastIndexOf('%2F') + 3, path.lastIndexOf('?'));
    firebase.storage().ref().child('images/' + firebase.auth().currentUser.uid + '/' + fileName).delete().then(() => { }).catch((error) => { });
  }

  //Delete the user.img given the user.
  deleteUserImageFile(user) {
    var fileName = user.img.substring(user.img.lastIndexOf('%2F') + 3, user.img.lastIndexOf('?'));
    firebase.storage().ref().child('images/' + user.userId + '/' + fileName).delete().then(() => { }).catch((error) => { });
  }

  // Delete group image file on group storage reference.
  deleteGroupImageFile(groupId, path) {
    var fileName = path.substring(path.lastIndexOf('%2F') + 3, path.lastIndexOf('?'));
    firebase.storage().ref().child('images/' + groupId + '/' + fileName).delete().then(() => { }).catch((error) => { });
  }

  // Upload photo message and return the url as promise.
  uploadPhotoMessage(conversationId, sourceType): Promise<any> {
    return new Promise(resolve => {
      this.photoMessageOptions.sourceType = sourceType;
      this.loadingProvider.show();
      // Get picture from camera or gallery.
      this.camera.getPicture(this.photoMessageOptions).then((imageData) => {
        // Process the returned imageURI.
        let imgBlob = this.imgURItoBlob("data:image/jpeg;base64," + imageData);
        let metadata = {
          'contentType': imgBlob.type
        };
        // Generate filename and upload to Firebase Storage.
        firebase.storage().ref().child('images/' + conversationId + '/' + this.generateFilename()).put(imgBlob, metadata).then((snapshot) => {
          // URL of the uploaded image!
          let url = snapshot.metadata.downloadURLs[0];
          this.loadingProvider.hide();
          resolve(url);
        }).catch((error) => {
          this.loadingProvider.hide();
          this.alertProvider.showErrorMessage('image/error-image-upload');
        });
      }).catch((error) => {
        this.loadingProvider.hide();
      });
    });
  }

  // Upload group photo message and return a promise as url.
  uploadGroupPhotoMessage(groupId, sourceType): Promise<any> {
    return new Promise(resolve => {
      this.photoMessageOptions.sourceType = sourceType;
      this.loadingProvider.show();
      // Get picture from camera or gallery.
      this.camera.getPicture(this.photoMessageOptions).then((imageData) => {
        // Process the returned imageURI.
        let imgBlob = this.imgURItoBlob("data:image/jpeg;base64," + imageData);
        let metadata = {
          'contentType': imgBlob.type
        };
        // Generate filename and upload to Firebase Storage.
        firebase.storage().ref().child('images/' + groupId + '/' + this.generateFilename()).put(imgBlob, metadata).then((snapshot) => {
          // URL of the uploaded image!
          let url = snapshot.metadata.downloadURLs[0];
          this.loadingProvider.hide();
          resolve(url);
        }).catch((error) => {
          this.loadingProvider.hide();
          this.alertProvider.showErrorMessage('image/error-image-upload');
        });
      }).catch((error) => {
        this.loadingProvider.hide();
      });
    });
  }
}
