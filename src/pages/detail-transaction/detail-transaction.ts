import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { DataProvider } from "../../providers/data";
import { AngularFireDatabase } from 'angularfire2/database';

@Component({
  selector: 'page-detail-transaction',
  templateUrl: 'detail-transaction.html',
})
export class DetailTransactionPage {

  date: any;
  lovepoint: any;
  namaPenerima: any;
  rek: any;
  bank: any;
  status: any;
  id: any;
  constructor(public navCtrl: NavController, public navParams: NavParams,public dataProvider: DataProvider) {
  }

  ionViewDidLoad() {
    this.id = this.navParams.get('idTr');
    console.log('aidiy',this.id);
    this.dataProvider.getTransactions(this.id).subscribe((tr) => {
      console.log('taramm',tr);
      this.date = tr.dateCreated;
      this.lovepoint = tr.lovepoint;
      this.namaPenerima = tr.namaPenerima;
      this.rek = tr.rek; 
      this.bank = tr.bank;
      this.status = tr.status;
    });

    console.log('ionViewDidLoad DetailTransactionPage');
  }

}
