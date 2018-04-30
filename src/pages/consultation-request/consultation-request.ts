import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { DataProvider } from "../../providers/data";

/**
 * Generated class for the ConsultationRequestPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-consultation-request',
  templateUrl: 'consultation-request.html',
})
export class ConsultationRequestPage {

  name: any;
  booking: any;
  confirmation: any;
  schedule: any;
  createdAt: any;
  session: any;
  userId: any;
  problem:any;
  foto:any;
  constructor(public navCtrl: NavController, public navParams: NavParams, public dataProvider: DataProvider) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ConsultationRequestPage');
    this.booking = this.navParams.get('booking');
    console.log('booking ', this.booking);
    this.name = this.navParams.get('user');
    console.log('name ', this.name);
    this.foto = this.navParams.get('foto');
    console.log('foto ', this.foto);
    this.confirmation = this.booking.confirmation;
    this.schedule = this.booking.scheduleId;
    this.session = this.booking.sessionke;
    this.createdAt = this.booking.createdAt;
    this.userId = this.booking.userId;
    this.problem = this.booking.problem;

    
    
  }

  accept(){
      this.dataProvider.accBooking(this.createdAt).then(() => {
        //  this.loadingProvider.hide();
        this.confirmation = 'accepted';
          console.log("sukses update booking");
        //  this.viewCtrl.dismiss(this.event);
        });

  }

}
