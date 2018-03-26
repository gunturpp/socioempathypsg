import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the DynamiclinkPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@Component({
  selector: 'page-dynamiclink',
  templateUrl: 'dynamiclink.html',
})
export class DynamiclinkPage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }
  gunturLinked(){
    window.open('https://sbs7a.app.goo.gl/bVbA', '_system');
  }
  yogaLinked(){
    window.open('https://sbs7a.app.goo.gl/Lr7u', '_system');
  }
  nizarLinked(){
    window.open('https://sbs7a.app.goo.gl/rY6Y', '_system');
  }

}
