import { BoardingPage } from "./../pages/boarding/boarding";
import { Component } from "@angular/core";
import { Platform } from "ionic-angular";
import { StatusBar } from "@ionic-native/status-bar";
import { SplashScreen } from "@ionic-native/splash-screen";
import { Keyboard } from "@ionic-native/keyboard";
import { FcmProvider } from "../providers/fcm/fcm";
//Pages
import { LoginPage } from "../pages/login/login";
import { TabsPage } from "../pages/tabs/tabs";
import * as firebase from "firebase";

@Component({
  templateUrl: "app.html"
})
export class MyApp {
  rootPage;

  constructor(
    platform: Platform,
    fcm: FcmProvider,
    statusBar: StatusBar,
    splashScreen: SplashScreen,
    keyboard: Keyboard
  ) {
    if (localStorage.getItem("toggle") == "true") {
      if (firebase.auth().currentUser) {
        this.rootPage = TabsPage;
      } else {
        this.rootPage = LoginPage;
      }
      // this.rootPage = LovepointStorePage;
    } else {
      this.rootPage = BoardingPage;
    }
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.

      // access token for push Notification
      fcm.getToken();
      // fcm.listenToNotifications()
      
      statusBar.styleDefault();
      splashScreen.hide();
      keyboard.hideKeyboardAccessoryBar(false);
      // fcm.getToken();
    });
  }
}
