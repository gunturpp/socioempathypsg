import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Validator } from '../../validator';
import { Validators } from '@angular/forms';
import { DetailWithdrawPage } from '../detail-withdraw/detail-withdraw';
/**
 * Generated class for the FormWithdrawPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-form-withdraw',
  templateUrl: 'form-withdraw.html',
})
export class FormWithdrawPage {

  masks: { phoneNumber: (string | RegExp)[]; };
  private withdrawForm: FormGroup;

  constructor(public navCtrl: NavController, public formBuilder: FormBuilder ,public navParams: NavParams) {

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

  next(){
    this.navCtrl.push(DetailWithdrawPage,{
      lovepoint: this.withdrawForm.value["lovepoint"],
      namaPenerima: this.withdrawForm.value["namaPenerima"],
      rek: this.withdrawForm.value["rek"],
      bank: this.withdrawForm.value["bank"]
    });
  }

}
