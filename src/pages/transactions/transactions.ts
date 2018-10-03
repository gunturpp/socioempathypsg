import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { LoadingProvider } from '../../providers/loading';
import { AngularFireDatabase } from 'angularfire2/database';
import { DataProvider } from '../../providers/data';
import { DetailTransactionPage } from '../detail-transaction/detail-transaction';

@Component({
  selector: 'page-transactions',
  templateUrl: 'transactions.html',
})
export class TransactionsPage {

  tr: any;
  constructor(public navCtrl: NavController, public navParams: NavParams,public dataProvider: DataProvider, public angularfireDatabase: AngularFireDatabase, 
    public loadingProvider: LoadingProvider
  ) {
  }

  ionViewDidLoad() {
    this.dataProvider.getTransactionAll().subscribe((tr) => {
      console.log('ahaaa',tr);
      this.tr = tr;
      console.log('trddd',this.tr);
    });
    console.log('ionViewDidLoad TransactionsPage');
  }

  detailTr(id){
    this.navCtrl.push(DetailTransactionPage,{idTr:id})
  }
}
