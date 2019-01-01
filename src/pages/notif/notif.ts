import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { DataProvider } from "../../providers/data";
import { ConsultationRequestPage } from '../consultation-request/consultation-request';

@Component({
  selector: 'page-notif',
  templateUrl: 'notif.html',
})
export class NotifPage {

  name: any;
  bookings = [];
  detailBooking = [];
  user = [];
  sessions = [];
  clients=[];

  constructor(public navCtrl: NavController, public navParams: NavParams, public dataProvider: DataProvider) {
  }

  ionViewDidLoad() {

    //get list of booking in psg table
    this.dataProvider.getListBooking().subscribe(listBooking => {
      this.bookings = listBooking;
      listBooking.forEach(booking => {
        this.dataProvider.getDetailBooking(booking.key).subscribe(detailBooking =>{
          this.detailBooking.push(detailBooking);
          console.log("detail_booking", this.detailBooking);
          console.log('ionViewDidLoad NotifPage');
          //get client profile in booking psg
          this.dataProvider.getClient(detailBooking.userId).subscribe(clients => {
            this.clients = clients;
            console.log("client_detail", this.clients);
          })
        })
      });
    });

  
  }
  request(booking,client) {
    this.navCtrl.push(ConsultationRequestPage, { booking: booking, client:client});
  }

}