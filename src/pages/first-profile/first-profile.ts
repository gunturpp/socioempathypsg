import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the FirstProfilePage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@IonicPage()
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
