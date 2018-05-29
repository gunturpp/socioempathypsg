import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,AlertController } from 'ionic-angular';
import { DataProvider } from "../../providers/data";
import { AngularFireDatabase } from 'angularfire2/database';
import { DetailUserPage } from '../detail-user/detail-user';
import { AlertProvider } from '../../providers/alert';


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

  alert: Promise<any>;
  message: string;
  name: any;
  booking: any;
  confirmation: any;
  schedule: any;
  createdAt: any;
  session: any;
  userId: any;
  problem: any;
  foto: any;
  constructor(public navCtrl: NavController, public navParams: NavParams, public dataProvider: DataProvider, public angularfireDatabase: AngularFireDatabase, 
    public alertCtrl: AlertController
  ) {
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

    if (this.booking.sessionke == "session1") {
      var sesi = "08.00 - 10.00";
    }
    else if (this.booking.sessionke == "session2") {
      var sesi = "10.00 - 12.00";
    }
    else if (this.booking.sessionke == "session3") {
      var sesi = "12.00 - 14.00";
    }
    else if (this.booking.sessionke == "session4") {
      var sesi = "14.00 - 16.00";
    }
    else if (this.booking.sessionke == "session5") {
      var sesi = "16.00 - 18.00";
    }

    this.session = sesi;

    this.createdAt = this.booking.createdAt;
    this.userId = this.booking.userId;
    this.problem = this.booking.problem;



  }

  accept() {
    this.dataProvider.accBooking(this.createdAt).then(() => {
      //  this.loadingProvider.hide();
      //make a conversation to users
      this.send();
      this.confirmation = 'accepted';
      this.navCtrl.pop();
      console.log("sukses update booking");
      //this.viewCtrl.dismiss(this.event);
    });
  }

  declinez(){
    this.dataProvider.rejectBooking(this.createdAt).then(() => {
      this.confirmation = 'rejected';
      this.navCtrl.pop();
      console.log("sukses reject booking");
    });
  }

  send() {
    var messages = [];
    messages.push({
      date: new Date().toString(),
      sender: localStorage.getItem('uid'),
      type: 'text',
      message: 'Selamat Request anda telah diterima oleh PSG'
    });
    var users = [];
    users.push(localStorage.getItem('uid'));
    users.push(this.userId);
    // Add conversation.
    this.angularfireDatabase.list('conversations').push({
      dateCreated: new Date().toString(),
      messages: messages,
      users: users,
      scheduleId: this.schedule,
      sessionke: this.session
    }).then((success) => {
      console.log('sukses buat conversation');
      let conversationId = success.key;
      this.message = '';
      // Add conversation reference to the users.
      this.angularfireDatabase.object('/psg/' + localStorage.getItem('uid') + '/conversations/' + this.userId + '/' + conversationId).update({
        conversationId: conversationId,
        messagesRead: 1
      });
      this.angularfireDatabase.object('/users/' + this.userId + '/conversations/' + localStorage.getItem('uid') + '/' + conversationId).update({
        conversationId: conversationId,
        messagesRead: 0
      });
    });
  }

  decline() {
    this.alert = this.alertCtrl.create({
      title: 'Confirm Reject',
      message: 'Are you sure you want to reject this request?',
      buttons: [
        {
          text: 'Cancel'
        },
        {
          text: 'Confirm',
          handler: data => { this.declinez(); }
        }
      ]
    }).present();
  }

  

  detail() {
    this.navCtrl.push(DetailUserPage, { uid: this.userId });
  }
  //end of send()

}
