import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { DataProvider } from "../../providers/data";
import { ConsultationRequestPage } from '../consultation-request/consultation-request';
import * as firebase from 'firebase';
import { LoadingProvider } from '../../providers/loading';

@Component({
  selector: 'page-notif',
  templateUrl: 'notif.html',
})
export class NotifPage {

  bookings = [];
  detailBooking = [];
  clients=[];

  constructor(
    public loadingProvider: LoadingProvider,
    public navCtrl: NavController, public navParams: NavParams, public dataProvider: DataProvider) {
  }

  ionViewDidLoad() {
    this.loadingProvider.show();

    var x = 0
    //get list of booking in psg table
    this.dataProvider.getListBooking().subscribe(listBooking => {
      listBooking.forEach(booking => {
        this.dataProvider.getValueBooking(booking.key).subscribe(val => {
          console.log("buking", val);
          this.bookings.push(val);
          this.dataProvider.getDetailBooking(val.id).subscribe(detailBooking =>{
            if (detailBooking.confirmation == "waiting" ) {
              console.log("detailBooking", detailBooking);
              x++
              this.detailBooking.push(detailBooking);
              console.log('ionViewDidLoad NotifPage',x);
              //get client profile in booking psg
              this.dataProvider.getClient(detailBooking.userId).subscribe(clients => {
                this.clients.push(clients);
                this.loadingProvider.hide();
                console.log("client_detail", this.clients);
              })
            }
          })
        })
      });
    });  
  }
  request(booking,client) {
    this.navCtrl.push(ConsultationRequestPage, { booking: booking, client:client});
  }
  ionViewWillLeave() {
    let tabs = document.querySelectorAll('.show-tabbar');
    if (tabs !== null) {
        Object.keys(tabs).map((key) => {
            tabs[key].style.display = 'flex';
        });
    }
  }
}