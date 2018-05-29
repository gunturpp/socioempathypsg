import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { FormWithdrawPage } from '../form-withdraw/form-withdraw';
import { DataProvider } from '../../providers/data';
import { DetailUserPage } from '../detail-user/detail-user';
import { DetailWithdrawPage } from '../detail-withdraw/detail-withdraw';
import { LoadingProvider } from '../../providers/loading';
import { TransactionsPage } from '../transactions/transactions';


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

  rek: Promise<any>;
  bank: Promise<any>;
  namaPenerima: Promise<any>;
  lovepoint: any;
  transactionId: any;
  cek=1;
  lp: any;
  user: any;
  constructor(public navCtrl: NavController, public navParams: NavParams,public dataProvider: DataProvider,public loadingProvider: LoadingProvider) {
  }

  ionViewDidEnter() {

    this.loadingProvider.show();
    console.log('ionViewDidLoad LovestorePage');
    this.dataProvider.getCurrentUser().subscribe((user) => {
      this.user = user;
      console.log('uu',this.user);
      this.lp = user.lovePoint;
      console.log('uzer',this.lp);
    });

    this.dataProvider.getTransactionsPsg().subscribe((tr) =>{
      console.log('tr',tr);
      if(tr.length == 0)
          this.cek=0;
      else {
        this.transactionId = tr[0].transactionId;
        console.log('trID',this.transactionId);
      }
      
      console.log('cek',this.cek);
    });
    this.loadingProvider.hide();
  }



  withdraw(){
    if(this.cek == 0)
      this.navCtrl.push(FormWithdrawPage);
    else{
      this.loadingProvider.show();
      this.detail();
      this.loadingProvider.hide();
    }
  }

  detail(){

    this.dataProvider.getTransactions(this.transactionId).subscribe((tran) =>{
      console.log('trann',tran);
       this.lovepoint = tran.lovepoint;
       this.namaPenerima = tran.namaPenerima;
       this.bank = tran.bank;
       this.rek = tran.rek;
      this.navCtrl.push(DetailWithdrawPage, {
        lovepoint: this.lovepoint,
        namaPenerima: this.namaPenerima,
        rek: this.rek,
        bank: this.bank,
        status:tran.status
      });

    });
      
  }

  transaction(){
    this.navCtrl.push(TransactionsPage);
  }

}
