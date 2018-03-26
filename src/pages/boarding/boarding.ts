import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { HomePage } from '../home/home';
import { LoginPage } from '../login/login';
import { LoginProvider } from './../../providers/login';
/*
  Generated class for the Boarding page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-boarding',
  templateUrl: 'boarding.html'
})
export class BoardingPage {

  constructor(public navCtrl: NavController, public navParams: NavParams, public loginProvider: LoginProvider) {
  }

  slides = [
    {
      image: "assets/images/onboarding1.jpg",
    },
 {
      image: "assets/images/onboarding2.jpg",
    },
    {
      image: "assets/images/onboarding3.jpg",
    }

  ];

  mulai(){
    this.navCtrl.setRoot(LoginPage);
    localStorage.setItem("toggle", "true");
  }

  lewati(){
    this.navCtrl.setRoot(LoginPage);
    localStorage.setItem("toggle", "true");
  }

}
