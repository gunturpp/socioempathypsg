import { Injectable, NgZone } from '@angular/core';
import * as firebase from 'firebase';
import { Login } from '../login';
import { NavController } from 'ionic-angular';
import { LoadingProvider } from './loading';
import { AlertProvider } from './alert';
import { LoginPage } from '../pages/login/login';
import { DataProvider } from './data';

@Injectable()
export class LoginProvider {
  private navCtrl: NavController;
  
  constructor(public loadingProvider: LoadingProvider,public dataProvider: DataProvider, public alertProvider: AlertProvider, public zone: NgZone) {
    // Detect changes on the Firebase user and redirects the view depending on the user's status.
    firebase.auth().onAuthStateChanged((user) => {
      
      if (user) {
        if (Login.emailVerification) {
          if (user["emailVerified"]) {
            //Goto Home Page.
            this.zone.run(() => {
              this.navCtrl.setRoot(Login.homePage, { animate: false });
            });
            //Since we're using a TabsPage an NgZone is required.
          } else {
            //Goto Verification Page.
            this.navCtrl.setRoot(Login.verificationPage, { animate: false });
          }
        } else {
          //Goto Home Page.
          this.zone.run(() => {
            this.navCtrl.setRoot(Login.homePage, { animate: false });
          });
          //Since we're using a TabsPage an NgZone is required.
        }
      }
    });
  }
  // Hook this provider up with the navigationController.
  // This is important, so the provider can redirect the app to the views depending
  // on the status of the Firebase user.
  setNavController(navCtrl) {
    this.navCtrl = navCtrl;
  }

  // Login on Firebase given the email and password.
  emailLogin(email, password) {
    this.loadingProvider.show();
    firebase.auth().signInWithEmailAndPassword(email, password)
      .then((success) => {
        this.dataProvider.getUser(firebase.auth().currentUser.uid).subscribe(user =>{
          console.log("user success2", success)
          if(user.role == "psychology") {
            localStorage.setItem('uid_psg', firebase.auth().currentUser.uid);
            localStorage.setItem('email_psg', firebase.auth().currentUser.email);
            localStorage.setItem('isLoggedIn', "true");
            this.loadingProvider.hide();
          } else {
            this.navCtrl.setRoot(LoginPage)
            localStorage.clear();
            localStorage.setItem("toggle", "true")      
            this.alertProvider.showErrorMessage("auth/not-psychology");
            this.loadingProvider.hide();
          }
        })
      })
      .catch((error) => {
        this.loadingProvider.hide();
        let code = error["code"];
        this.alertProvider.showErrorMessage(code);
      });
  }

  // Register user on Firebase given the email and password.
  register(displayName,email, password, phoneNumber, gender,province,birth) {
    this.loadingProvider.show();
    localStorage.setItem("displayName", displayName);
    localStorage.setItem('phoneNumber', phoneNumber);
    localStorage.setItem('province', province);
    localStorage.setItem('gender', gender);
    localStorage.setItem('birth', birth);
    firebase.auth().createUserWithEmailAndPassword(email, password)
      .then((success) => {
        this.loadingProvider.hide();
      })
      .catch((error) => {
        this.loadingProvider.hide();
        let code = error["code"];
        this.alertProvider.showErrorMessage(code);
      });
  }

  // Send Password Reset Email to the user.
  sendPasswordReset(email) {
    this.loadingProvider.show();
    firebase.auth().sendPasswordResetEmail(email)
      .then((success) => {
        this.loadingProvider.hide();
        this.alertProvider.showPasswordResetMessage(email);
      })
      .catch((error) => {
        this.loadingProvider.hide();
        let code = error["code"];
        this.alertProvider.showErrorMessage(code);
      });
  }

}
