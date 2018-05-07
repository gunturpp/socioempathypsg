import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { DataProvider } from "../../providers/data";
import { AngularFireDatabase } from 'angularfire2/database';


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

  message: string;
  name: any;
  booking: any;
  confirmation: any;
  schedule: any;
  createdAt: any;
  session: any;
  userId: any;
  problem:any;
  foto:any;
  constructor(public navCtrl: NavController, public navParams: NavParams, public dataProvider: DataProvider,public angularfireDatabase: AngularFireDatabase,) {
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
        //make a conversation to users
        this.send();
        this.confirmation = 'accepted';
          console.log("sukses update booking");
        //this.viewCtrl.dismiss(this.event);
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
          scheduleId: this.schedule
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

  //end of send()

}
