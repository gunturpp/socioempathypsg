import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { DataProvider } from '../../providers/data';

@Component({
  selector: 'page-detail-user',
  templateUrl: 'detail-user.html',
})
export class DetailUserPage {

  uid: any;
  user: any;
  constructor(public navCtrl: NavController, public navParams: NavParams,public dataProvider: DataProvider) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad DetailUserPage');
    this.uid = this.navParams.get('uid');
    this.dataProvider.getClient(this.uid).subscribe((user) => {
      this.user = user;
      console.log('uzer',this.user);
    });
  }

}
