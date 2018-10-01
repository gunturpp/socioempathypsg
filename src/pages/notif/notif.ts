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

  foto = [];
  name: any;
  index2: number;
  bookings = [];
  index: number;
  booking = [];
  user = [];
  sessions = [];
  bookingz = [];
  //empty = 1;

  constructor(public navCtrl: NavController, public navParams: NavParams, public dataProvider: DataProvider) {
  }

  ionViewDidEnter() {
    this.bookings = [];
    this.user = [];
    this.booking = [];
    this.sessions = [];

    //get list of booking in psg table


    //get list of idBooking in PsgTable

    console.log('ionViewDidLoad NotifPage');
  }

  request(booking, user, foto) {
    this.navCtrl.push(ConsultationRequestPage, { booking: booking, user: user, foto: foto });
  }

}