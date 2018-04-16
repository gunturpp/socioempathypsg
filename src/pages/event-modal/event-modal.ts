import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';
import * as moment from 'moment';
import { DataProvider } from '../../providers/data';
import { AngularFireDatabase } from 'angularfire2/database';
import { LoadingProvider } from '../../providers/loading';
import * as firebase from 'firebase';


@IonicPage()
@Component({
  selector: 'page-event-modal',
  templateUrl: 'event-modal.html',
})
export class EventModalPage {

  user: any;
  userId: any;
  event = { startTime: new Date().toISOString(), endTime: new Date().toISOString(), allDay: false };
  minDate = new Date().toISOString();

  constructor(public navCtrl: NavController, public navParams: NavParams, public viewCtrl: ViewController,
    public dataProvider: DataProvider, public angularfireDatabase: AngularFireDatabase, public loadingProvider: LoadingProvider,
    
  ) {
    let preselectedDate = moment(this.navParams.get('selectedDay')).format();
    this.event.startTime = preselectedDate;
    this.event.endTime = preselectedDate;
  }

  cancel() {
    this.viewCtrl.dismiss();
  }
 
  save() {
    this.viewCtrl.dismiss(this.event);
  }

  ionViewDidLoad() {
   /// this.createScheduling();
    this.loadingProvider.show();
    this.dataProvider.getUser(firebase.auth().currentUser.uid).subscribe(user => {
      this.loadingProvider.hide();
      this.user = user;
      this.userId = this.user.userId;
      console.log("userScheduling", this.user);
    });
  }

  createScheduling() {
    firebase
    .database()
    .ref("/scheduling/" + firebase.auth().currentUser.uid)
    .once("value")
    .then(account => {
      //console.log(account.val());
      // No database data yet, create user data on database
      if (!account.val()) {
        // this.loadingProvider.show();
       // Insert data on our database using AngularFire.
       this.angularfireDatabase.object('/scheduling/' + this.user.userId)
        .set({
          userId: this.userId,
          scheduling: "dnksdjcnsdkjcnsdkc",
          date: "10 januari 2018",
          session: '1',
          switchStatus: true
        })
        .then(() => {
          console.log("sukses buat schedule");
          this.viewCtrl.dismiss(this.event);
        });
      }
    });
  }

}
