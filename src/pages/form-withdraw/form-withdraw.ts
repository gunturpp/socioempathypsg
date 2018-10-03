import { Component } from '@angular/core';
import { NavController, NavParams, AlertController } from 'ionic-angular';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Validator } from '../../validator';
import { Validators } from '@angular/forms';
import { DetailWithdrawPage } from '../detail-withdraw/detail-withdraw';
import { LoadingProvider } from '../../providers/loading';
import { AngularFireDatabase } from 'angularfire2/database';

@Component({
  selector: 'page-form-withdraw',
  templateUrl: 'form-withdraw.html',
})
export class FormWithdrawPage {

  alert: Promise<any>;
  masks: { phoneNumber: (string | RegExp)[]; };
  private withdrawForm: FormGroup;

  constructor(public navCtrl: NavController, public formBuilder: FormBuilder, public navParams: NavParams,
    public alertCtrl: AlertController, public loadingProvider: LoadingProvider,public angularfireDatabase: AngularFireDatabase) {

    this.withdrawForm = formBuilder.group({
      lovepoint: Validators.required,
      namaPenerima: "",
      rek: Validators.required,
      bank: Validators.required
      //  gender: Validators.required
    });

    this.masks = {
      phoneNumber: ['(', /[1-9]/, /\d/, /\d/, ')', ' ', /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/]
    };
  }


  ionViewDidLoad() {
    
    console.log('ionViewDidLoad FormWithdrawPage');


  }

  next() {

    // Add conversation.
    this.angularfireDatabase.list('transactionPSG').push({
      dateCreated: new Date().toString(),
      namaPenerima: this.withdrawForm.value["namaPenerima"],
      lovepoint: this.withdrawForm.value["lovepoint"],
      psgId: localStorage.getItem('uid'),
      rek: this.withdrawForm.value["rek"],
      bank: this.withdrawForm.value["bank"],
      status: "waiting"
    }).then((success) => {
      console.log('sukses buat conversation');
      let transactionId = success.key;
      // Add conversation reference to the users.
      this.angularfireDatabase.object('/psg/' + localStorage.getItem('uid') + '/transactions/' + transactionId).update({
        transactionId: transactionId,
        status:'waiting'
       // messagesRead: 1
      });
    });
    // date: new Date().toString(),
    
    this.navCtrl.push(DetailWithdrawPage, {
      lovepoint: this.withdrawForm.value["lovepoint"],
      namaPenerima: this.withdrawForm.value["namaPenerima"],
      rek: this.withdrawForm.value["rek"],
      bank: this.withdrawForm.value["bank"],
      status:'waiting'
    });
    
  }

  confirm() {
    this.alert = this.alertCtrl.create({
      title: 'Confirm Withdraw',
      message: 'Are you sure you want to exchange your Lovepoint?',
      buttons: [
        {
          text: 'Cancel'
        },
        {
          text: 'Confirm',
          handler: data => { 
            this.loadingProvider.show();
            this.next(); 
            this.loadingProvider.hide();
          }
        }
      ]
    }).present();
  }

}
