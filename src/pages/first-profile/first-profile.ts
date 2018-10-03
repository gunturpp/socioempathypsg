import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

@Component({
  selector: 'page-first-profile',
  templateUrl: 'first-profile.html',
})
export class FirstProfilePage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  setPhoto(){
    console.log("upload photo");
  }
  ionViewDidLoad() {
    console.log('ionViewDidLoad FirstProfilePage');
  }

}
