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
    this.dataProvider.getListBooking().subscribe(data => {
      this.index = 0;
      this.index2 = 0;
      for (var i = 0; i < data.length; i++) {
        this.bookingz[i] = data[i];
        console.log('booking', data);
        console.log('key ', this.bookingz[i].key);
        //get Detailbooking in booking table
        this.dataProvider.getDetailBooking(this.bookingz[i].key).subscribe(data2 => {
          console.log('data2', data2);
          this.bookings[this.index] = data2;
          this.index += 1;
          if(data2.sessionke == "session1"){
              var sesi = "06.00 - 08.00";
          }
          else if(data2.sessionke == "session2"){
              var sesi = "08.00 - 10.00";
          }
          else if(data2.sessionke == "session3"){
              var sesi = "10.00 - 12.00";
          }
          else if(data2.sessionke == "session4"){
              var sesi = "12.00 - 14.00";
          }
          else if(data2.sessionke == "session5"){
              var sesi = "14.00 - 16.00";
          }
          this.sessions[this.index-1] = sesi;
          console.log('seseses',this.sessions);
          console.log('bookings ', this.bookings);
          //get client data from users table
          this.dataProvider.getClient(data2.userId).subscribe(data => {
            console.log('data3', data);
            this.name = data.name;
            console.log('name', this.name);
            this.user[this.index2] = this.name;
            this.foto[this.index2] = data.img;
            console.log('foto ', this.foto);
            this.index2 += 1;
            console.log('user', this.user);
            //this.empty = 0;
          });

        });


      }

    });
    console.log('ionViewDidLoad NotifPage');
  }

  request(booking, user, foto) {
    this.navCtrl.push(ConsultationRequestPage, { booking: booking, user: user, foto: foto });
  }

}