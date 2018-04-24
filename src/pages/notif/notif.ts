import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { DataProvider } from "../../providers/data";


/**
 * Generated class for the NotifPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-notif',
  templateUrl: 'notif.html',
})
export class NotifPage {

  constructor(public navCtrl: NavController, public navParams: NavParams, public dataProvider: DataProvider) {
  }

  ionViewDidLoad() {
    this.dataProvider.getListBooking().subscribe(data=>{
      console.log('booking', data);
    });
    console.log('ionViewDidLoad NotifPage');
  }

}
