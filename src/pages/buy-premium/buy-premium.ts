import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the BuyPremiumPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@IonicPage()
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
