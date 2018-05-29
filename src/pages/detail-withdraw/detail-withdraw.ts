import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the DetailWithdrawPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-detail-withdraw',
  templateUrl: 'detail-withdraw.html',
})
export class DetailWithdrawPage {

  status: any;
  lovepoint: any;
  namaPenerima: any;
  rek: any;
  bank: any;
  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {

    this.lovepoint = this.navParams.get('lovepoint');
    this.namaPenerima = this.navParams.get('namaPenerima');
    this.rek = this.navParams.get('rek');
    this.bank = this.navParams.get('bank');
    this.status = this.navParams.get('status');
    console.log('ionViewDidLoad DetailWithdrawPage');
    console.log('lp',this.lovepoint);
  }

}
