import { BoardingPage } from './../pages/boarding/boarding';
import { Component } from '@angular/core';
import { Platform,ToastController } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { Keyboard } from '@ionic-native/keyboard';

import { FcmProvider } from '../providers/fcm/fcm';

import { Subject } from 'rxjs/Subject';
import { tap } from 'rxjs/operators';
//Pages
import { LoginPage } from '../pages/login/login';
import { MessagesPage } from '../pages/messages/messages';
import { FirstProfilePage } from '../pages/first-profile/first-profile';
// import { Payment3Page } from '../pages/payment3/payment3';
import { SignupPage } from '../pages/signup/signup';
import * as firebase from 'firebase';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  
  rootPage;
  
  constructor(platform: Platform, fcm: FcmProvider, toastCtrl: ToastController, statusBar: StatusBar, splashScreen: SplashScreen, keyboard: Keyboard) {

    fcm.getToken()

    // Listen to incoming messages
    fcm.listenToNotifications().pipe(
      tap(msg => {
        // show a toast
        const toast = toastCtrl.create({
          message: msg.body,
          duration: 3000,
          position: 'top'
        });
        toast.present();
      })
    )
    .subscribe()

    if(localStorage.getItem("toggle") == "true"){
      // this.rootPage = Payment3Page; 
      this.rootPage = LoginPage; 
      // this.rootPage = SignupPage; 
    } else {
      this.rootPage = BoardingPage;
    }
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      splashScreen.hide();
      keyboard.hideKeyboardAccessoryBar(false);
    });
  }
}

