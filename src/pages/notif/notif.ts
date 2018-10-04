import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { DataProvider } from "../../providers/data";
import { ConsultationRequestPage } from '../consultation-request/consultation-request';

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
  detailBooking = [];
  user = [];
  sessions = [];
  clients = [];
  //empty = 1;

  constructor(public navCtrl: NavController, public navParams: NavParams, public dataProvider: DataProvider) {
  }

  ionViewDidEnter() {

    //get list of booking in psg table
    this.dataProvider.getListBooking().subscribe(listBooking => {
      this.bookings = listBooking;
      listBooking.forEach(booking => {
        this.dataProvider.getDetailBooking(booking.key).subscribe(detailBooking =>{
          this.detailBooking.push(detailBooking);
          console.log("detail_booking", this.detailBooking);
  
          //get client profile in booking psg
          this.dataProvider.getClient(detailBooking.userId).subscribe(clients => {
            this.clients = clients;
            console.log("client_detail", this.clients);
          })
        })
      });
    });

  
    console.log('ionViewDidLoad NotifPage');
  }
  request(booking) {
    this.navCtrl.push(ConsultationRequestPage, { booking: booking});
  }

}