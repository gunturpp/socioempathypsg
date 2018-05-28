import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { FormWithdrawPage } from '../form-withdraw/form-withdraw';
import { DataProvider } from '../../providers/data';

/**
 * Generated class for the LovestorePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-lovestore',
  templateUrl: 'lovestore.html',
})
export class LovestorePage {

  lp: any;
  user: any;
  constructor(public navCtrl: NavController, public navParams: NavParams,public dataProvider: DataProvider) {
  }

  ionViewDidEnter() {

    console.log('ionViewDidLoad LovestorePage');
    this.dataProvider.getCurrentUser().subscribe((user) => {
      this.user = user;
      console.log('uu',this.user);
      this.lp = user.lovePoint;
      console.log('uzer',this.lp);
    });

  }

  withdraw(){
    this.navCtrl.push(FormWithdrawPage);
  }

}
