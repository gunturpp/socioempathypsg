import { Injectable, NgZone } from '@angular/core';
import * as firebase from 'firebase';
import { Login } from '../login';
import { NavController } from 'ionic-angular';
import { LoadingProvider } from './loading';
import { AlertProvider } from './alert';
import { LoginPage } from '../pages/login/login';
import { CalendarPage } from '../pages/calendar/calendar';
import { TabsPage} from '../pages/tabs/tabs';

@Injectable()
export class LoginProvider {
  private navCtrl: NavController;
  
  constructor(public loadingProvider: LoadingProvider, public alertProvider: AlertProvider, public zone: NgZone) {
    // Detect changes on the Firebase user and redirects the view depending on the user's status.
    firebase.auth().onAuthStateChanged((user) => {
      //console.log("firebase auth : ");
      if (user) {
          if (Login.emailVerification) {
            if (1) { //user["emailVerified"]
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
    //last block
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
        localStorage.setItem('uid_psg', firebase.auth().currentUser.uid);
        localStorage.setItem('email_psg', firebase.auth().currentUser.email);
        this.loadingProvider.hide();
      })
      .catch((error) => {
        this.loadingProvider.hide();
        let code = error["code"];
        this.alertProvider.showErrorMessage(code);
      });
  }

  // Register user on Firebase given the email and password.
  register(email, password, role, phone, gender) {
    this.loadingProvider.show();
    localStorage.setItem('registerRole',role);
    localStorage.setItem('gender', gender);
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
