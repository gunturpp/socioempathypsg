import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';

import { AchievDetailPage } from '../achiev-detail/achiev-detail';

/**
 * Generated class for the AchievementPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-achievement',
  templateUrl: 'achievement.html',
})
export class AchievementPage {

  items = [];
  constructor(public navCtrl: NavController, public navParams: NavParams, public alertCtrl: AlertController) {
    this.items = [
      {
        'title': 'Tell your sad story',
      }, 
      {
        'title': 'Play game',
      }, 
      {
        'title': 'Sleepless',
      }, 
      {
        'title': 'Get Sports',
      }, 
    
  ]
  }
  // show description about achievement list
  showDescription(ID){
    this.navCtrl.push(AchievDetailPage, {ID: ID});
    console.log("show keterangan disini");
  }
  ionViewDidLoad() {
    console.log('ionViewDidLoad AchievementPage');
  }

  guide(){
    let alert = this.alertCtrl.create({
      title: 'About this feature',
      cssClass: 'alert',
      subTitle: 'Life Achievement adalah fitur yang membimbing anda melakukan aktifitas yang positif. Semakin banyak anda menyelesaikan task tersebut, harapannya aura positif tercipta dari dalam diri anda.',
      buttons: ['Dismiss'],
    });
    alert.present();
  }

}
