import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { DataProvider } from "../../providers/data";
import { ConsultationRequestPage } from '../consultation-request/consultation-request';


/**
 * Generated class for the NotifPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-notif',
  templateUrl: 'notif.html',
})
export class NotifPage {

  index2: number;
  bookings= [];
  index: number;
  booking= [];
  user = [];
  constructor(public navCtrl: NavController, public navParams: NavParams, public dataProvider: DataProvider) {
  }

  ionViewDidLoad() {
    this.dataProvider.getListBooking().subscribe(data=>{
      this.index = 0;
      this.index2 = 0;
      for(var i=0; i<data.length; i++){
        this.booking[i] = data[i];
        console.log('booking', data);
        console.log('key ',this.booking[i].key);
        this.dataProvider.getDetailBooking(this.booking[i].key).subscribe(data2=>{
            console.log('data2',data2);
            this.bookings[this.index] = data2;
            this.index += 1;  
            console.log('bookings ',this.bookings);
            this.dataProvider.getClient(data2.userId).subscribe(data=>{
              console.log('data3',data);
              this.user[this.index2] = data;
              this.index2 += 1;
              console.log('user',this.user);
            });

        });

        
      }

    });
    console.log('ionViewDidLoad NotifPage');
  }

  request(){
    this.navCtrl.push(ConsultationRequestPage);
  }

}
