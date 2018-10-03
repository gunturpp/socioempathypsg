import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

@Component({
  selector: 'page-buy-premium',
  templateUrl: 'buy-premium.html',
})
export class BuyPremiumPage {
  
  // pop up pertama kali doang
  private popUp: boolean = true;
  
  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }
  ionViewDidLoad() {
  }

  closeBtn(){
    this.popUp = false;
  }

}
