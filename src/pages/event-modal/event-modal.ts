import { Component } from '@angular/core';
import { NavController, NavParams, ViewController } from 'ionic-angular';
import * as moment from 'moment';
import { DataProvider } from '../../providers/data';
import { AngularFireDatabase } from 'angularfire2/database';
import { LoadingProvider } from '../../providers/loading';
import * as firebase from 'firebase';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'page-event-modal',
  templateUrl: 'event-modal.html',
})
export class EventModalPage {

  user: any;
  userId: any;
  session1: boolean = false;
  session2: boolean = false;
  session3: boolean = false;
  session4: boolean = false;
  session5: boolean = false;
  session6: boolean = false;
  session7: boolean = false;
  session8: boolean = false;
  session9: boolean = false;
  session10: boolean = false;
  session11: boolean = false;
  session12: boolean = false;
  session13: boolean = false;
  session14: boolean = false;
  dates: any;
  dates2: any;

  private scheduleForm: FormGroup;


  event = { startTime: new Date().toISOString(), endTime: new Date().toISOString(), allDay: false };
  minDate = new Date().toISOString();

  constructor(public navCtrl: NavController, public navParams: NavParams, public viewCtrl: ViewController,
    public dataProvider: DataProvider, public angularfireDatabase: AngularFireDatabase, public loadingProvider: LoadingProvider,
    public formBuilder: FormBuilder
  ) {


    let preselectedDate = moment(this.navParams.get('selectedDay')).format();
    //let preselectedDate = this.navParams.get('selectedDay').format();
    // let sessionPsg = this.navParams.get('session');
    this.event.startTime = preselectedDate;
    this.event.endTime = preselectedDate;
    this.dates2 = preselectedDate.substring(0,10);
    this.dates = preselectedDate;
  console.log('substring' , this.dates.substring(0,10));
  }
  //end of construtor
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
      this.user = user;
      console.log("userScheduling", user);
      this.userId = this.user.userId;
      this.loadingProvider.hide();
    });
  }

  createScheduling() {
    this.loadingProvider.show();
    // Insert data on our database using AngularFire.
    if(this.session1){
      this.angularfireDatabase.object('/scheduling/' + this.dates2 + '/session1/' + firebase.auth().currentUser.uid )
        .update({
          available: true,
          date: this.dates
        })
        .then(() => {
          console.log("sukses buat schedule1");
          });
        this.angularfireDatabase.object('psg/' + firebase.auth().currentUser.uid + '/scheduling/' + this.dates2 )
        .update({
          session1: true,
        })
        .then(() => {
          console.log("sukses buat schedule1s");
        });
    } 
    if (this.session2){
      this.angularfireDatabase.object('/scheduling/' + this.dates2 + '/session2/' + firebase.auth().currentUser.uid )
      .update({
        available: true,
        date: this.dates

      })
      .then(() => {
        console.log("sukses buat schedule2");
      });

      this.angularfireDatabase.object('psg/' + firebase.auth().currentUser.uid + '/scheduling/' + this.dates2  )
      .update({
        session2: true,
      })
      .then(() => {
        console.log("sukses buat schedule2s");
      });
    } 
    if (this.session3) {
      this.angularfireDatabase.object('/scheduling/' + this.dates2 + '/session3/' + firebase.auth().currentUser.uid )
      .update({
        available: true,
        date: this.dates

      })
      .then(() => {
        console.log("sukses buat schedule3");
      });

      this.angularfireDatabase.object('psg/' + firebase.auth().currentUser.uid + '/scheduling/' + this.dates2 )
      .update({
        session3: true
      })
      .then(() => {
        console.log("sukses buat schedule3s");
      });
    } 
    if (this.session4){
      this.angularfireDatabase.object('/scheduling/' + this.dates2 + '/session4/' + firebase.auth().currentUser.uid )
      .update({
        available: true,
        date: this.dates

      })
      .then(() => {
        console.log("sukses buat schedule4");
      });

      this.angularfireDatabase.object('psg/' + firebase.auth().currentUser.uid + '/scheduling/' + this.dates2 )
      .update({
        session4: true,
      })
      .then(() => {
        console.log("sukses buat schedule4s");
      });
    } 
    if (this.session5){
      this.angularfireDatabase.object('/scheduling/' + this.dates2 + '/session5/' + firebase.auth().currentUser.uid )
      .update({
        available: true,
        date: this.dates

      })
      .then(() => {
        console.log("sukses buat schedule5");
      });

      this.angularfireDatabase.object('psg/' + firebase.auth().currentUser.uid + '/scheduling/' + this.dates2 )
      .update({
        session5: true,
      })
      .then(() => {
        console.log("sukses buat schedule5s");
      });
    }
    if(this.session6){
      this.angularfireDatabase.object('/scheduling/' + this.dates2 + '/session6/' + firebase.auth().currentUser.uid )
        .update({
          available: true,
          date: this.dates
        })
        .then(() => {
          console.log("sukses buat schedule6");
          });
        this.angularfireDatabase.object('psg/' + firebase.auth().currentUser.uid + '/scheduling/' + this.dates2 )
        .update({
          session6: true,
        })
        .then(() => {
          console.log("sukses buat schedule1s");
        });
    } 
    if (this.session7){
      this.angularfireDatabase.object('/scheduling/' + this.dates2 + '/session7/' + firebase.auth().currentUser.uid )
      .update({
        available: true,
        date: this.dates

      })
      .then(() => {
        console.log("sukses buat schedule2");
      });

      this.angularfireDatabase.object('psg/' + firebase.auth().currentUser.uid + '/scheduling/' + this.dates2  )
      .update({
        session7: true,
      })
      .then(() => {
        console.log("sukses buat schedule2s");
      });
    } 
    if (this.session8) {
      this.angularfireDatabase.object('/scheduling/' + this.dates2 + '/session8/' + firebase.auth().currentUser.uid )
      .update({
        available: true,
        date: this.dates

      })
      .then(() => {
        console.log("sukses buat schedule3");
      });

      this.angularfireDatabase.object('psg/' + firebase.auth().currentUser.uid + '/scheduling/' + this.dates2 )
      .update({
        session8: true
      })
      .then(() => {
        console.log("sukses buat schedule3s");
      });
    } 
    if (this.session9){
      this.angularfireDatabase.object('/scheduling/' + this.dates2 + '/session9/' + firebase.auth().currentUser.uid )
      .update({
        available: true,
        date: this.dates

      })
      .then(() => {
        console.log("sukses buat schedule4");
      });

      this.angularfireDatabase.object('psg/' + firebase.auth().currentUser.uid + '/scheduling/' + this.dates2 )
      .update({
        session9: true,
      })
      .then(() => {
        console.log("sukses buat schedule4s");
      });
    } 
    if (this.session10){
      this.angularfireDatabase.object('/scheduling/' + this.dates2 + '/session10/' + firebase.auth().currentUser.uid )
      .update({
        available: true,
        date: this.dates

      })
      .then(() => {
        console.log("sukses buat schedule5");
      });

      this.angularfireDatabase.object('psg/' + firebase.auth().currentUser.uid + '/scheduling/' + this.dates2 )
      .update({
        session10: true,
      })
      .then(() => {
        console.log("sukses buat schedule5s");
      });
    }
    if(this.session11){
      this.angularfireDatabase.object('/scheduling/' + this.dates2 + '/session11/' + firebase.auth().currentUser.uid )
        .update({
          available: true,
          date: this.dates
        })
        .then(() => {
          console.log("sukses buat schedule1");
          });
        this.angularfireDatabase.object('psg/' + firebase.auth().currentUser.uid + '/scheduling/' + this.dates2 )
        .update({
          session11: true,
        })
        .then(() => {
          console.log("sukses buat schedule1s");
        });
    } 
    if (this.session12){
      this.angularfireDatabase.object('/scheduling/' + this.dates2 + '/session12/' + firebase.auth().currentUser.uid )
      .update({
        available: true,
        date: this.dates

      })
      .then(() => {
        console.log("sukses buat schedule2");
      });

      this.angularfireDatabase.object('psg/' + firebase.auth().currentUser.uid + '/scheduling/' + this.dates2  )
      .update({
        session12: true,
      })
      .then(() => {
        console.log("sukses buat schedule2s");
      });
    } 
    if (this.session13) {
      this.angularfireDatabase.object('/scheduling/' + this.dates2 + '/session13/' + firebase.auth().currentUser.uid )
      .update({
        available: true,
        date: this.dates

      })
      .then(() => {
        console.log("sukses buat schedule3");
      });

      this.angularfireDatabase.object('psg/' + firebase.auth().currentUser.uid + '/scheduling/' + this.dates2 )
      .update({
        session13: true
      })
      .then(() => {
        console.log("sukses buat schedule3s");
      });
    } 
    if (this.session14){
      this.angularfireDatabase.object('/scheduling/' + this.dates2 + '/session14/' + firebase.auth().currentUser.uid )
      .update({
        available: true,
        date: this.dates

      })
      .then(() => {
        console.log("sukses buat schedule4");
      });

      this.angularfireDatabase.object('psg/' + firebase.auth().currentUser.uid + '/scheduling/' + this.dates2 )
      .update({
        session14: true,
      })
      .then(() => {
        console.log("sukses buat schedule4s");
      });
    }
    this.viewCtrl.dismiss(this.event);
    this.loadingProvider.hide();
  }

}
