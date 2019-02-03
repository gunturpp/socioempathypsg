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
  session8: boolean = false;
  session9: boolean = false;
  session10: boolean = false;
  session11: boolean = false;
  session12: boolean = false;
  session13: boolean = false;
  session14: boolean = false;
  session15: boolean = false;
  session16: boolean = false;
  session17: boolean = false;
  session18: boolean = false;
  session19: boolean = false;
  session20: boolean = false;
  session21: boolean = false;
  dates: any;
  dates2: any;
  session=[];
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
    this.session
    // Insert data on our database using AngularFire.
    if(this.session8){
      this.angularfireDatabase.object('/scheduling/' + this.dates2 + '/session8/' + firebase.auth().currentUser.uid )
        .update({
          available: true,
          date: this.dates
        })
        .then(() => {
          console.log("sukses buat schedule1");
          });
        this.angularfireDatabase.object('psg/' + firebase.auth().currentUser.uid + '/scheduling/' + this.dates2 )
        .update({
          session8: true,
        })
        .then(() => {
          console.log("sukses buat schedule1s");
        });
    } 
    if (this.session9){
      this.angularfireDatabase.object('/scheduling/' + this.dates2 + '/session9/' + firebase.auth().currentUser.uid )
      .update({
        available: true,
        date: this.dates

      })
      .then(() => {
        console.log("sukses buat schedule2");
      });

      this.angularfireDatabase.object('psg/' + firebase.auth().currentUser.uid + '/scheduling/' + this.dates2  )
      .update({
        session9: true,
      })
      .then(() => {
        console.log("sukses buat schedule2s");
      });
    } 
    if (this.session10) {
      this.angularfireDatabase.object('/scheduling/' + this.dates2 + '/session10/' + firebase.auth().currentUser.uid )
      .update({
        available: true,
        date: this.dates

      })
      .then(() => {
        console.log("sukses buat schedule3");
      });

      this.angularfireDatabase.object('psg/' + firebase.auth().currentUser.uid + '/scheduling/' + this.dates2 )
      .update({
        session10: true
      })
      .then(() => {
        console.log("sukses buat schedule3s");
      });
    } 
    if (this.session11){
      this.angularfireDatabase.object('/scheduling/' + this.dates2 + '/session11/' + firebase.auth().currentUser.uid )
      .update({
        available: true,
        date: this.dates

      })
      .then(() => {
        console.log("sukses buat schedule4");
      });

      this.angularfireDatabase.object('psg/' + firebase.auth().currentUser.uid + '/scheduling/' + this.dates2 )
      .update({
        session11: true,
      })
      .then(() => {
        console.log("sukses buat schedule4s");
      });
    } 
    if (this.session12){
      this.angularfireDatabase.object('/scheduling/' + this.dates2 + '/session12/' + firebase.auth().currentUser.uid )
      .update({
        available: true,
        date: this.dates

      })
      .then(() => {
        console.log("sukses buat schedule5");
      });

      this.angularfireDatabase.object('psg/' + firebase.auth().currentUser.uid + '/scheduling/' + this.dates2 )
      .update({
        session12: true,
      })
      .then(() => {
        console.log("sukses buat schedule5s");
      });
    }
    if(this.session13){
      this.angularfireDatabase.object('/scheduling/' + this.dates2 + '/session13/' + firebase.auth().currentUser.uid )
        .update({
          available: true,
          date: this.dates
        })
        .then(() => {
          console.log("sukses buat schedule6");
          });
        this.angularfireDatabase.object('psg/' + firebase.auth().currentUser.uid + '/scheduling/' + this.dates2 )
        .update({
          session13: true,
        })
        .then(() => {
          console.log("sukses buat schedule1s");
        });
    } 
    if (this.session14){
      this.angularfireDatabase.object('/scheduling/' + this.dates2 + '/session14/' + firebase.auth().currentUser.uid )
      .update({
        available: true,
        date: this.dates

      })
      .then(() => {
        console.log("sukses buat schedule2");
      });

      this.angularfireDatabase.object('psg/' + firebase.auth().currentUser.uid + '/scheduling/' + this.dates2  )
      .update({
        session14: true,
      })
      .then(() => {
        console.log("sukses buat schedule2s");
      });
    } 
    if (this.session15) {
      this.angularfireDatabase.object('/scheduling/' + this.dates2 + '/session15/' + firebase.auth().currentUser.uid )
      .update({
        available: true,
        date: this.dates

      })
      .then(() => {
        console.log("sukses buat schedule3");
      });

      this.angularfireDatabase.object('psg/' + firebase.auth().currentUser.uid + '/scheduling/' + this.dates2 )
      .update({
        session15: true
      })
      .then(() => {
        console.log("sukses buat schedule3s");
      });
    } 
    if (this.session16){
      this.angularfireDatabase.object('/scheduling/' + this.dates2 + '/session16/' + firebase.auth().currentUser.uid )
      .update({
        available: true,
        date: this.dates

      })
      .then(() => {
        console.log("sukses buat schedule4");
      });

      this.angularfireDatabase.object('psg/' + firebase.auth().currentUser.uid + '/scheduling/' + this.dates2 )
      .update({
        session16: true,
      })
      .then(() => {
        console.log("sukses buat schedule4s");
      });
    } 
    if (this.session17){
      this.angularfireDatabase.object('/scheduling/' + this.dates2 + '/session17/' + firebase.auth().currentUser.uid )
      .update({
        available: true,
        date: this.dates

      })
      .then(() => {
        console.log("sukses buat schedule5");
      });

      this.angularfireDatabase.object('psg/' + firebase.auth().currentUser.uid + '/scheduling/' + this.dates2 )
      .update({
        session17: true,
      })
      .then(() => {
        console.log("sukses buat schedule5s");
      });
    }
    if(this.session18){
      this.angularfireDatabase.object('/scheduling/' + this.dates2 + '/session18/' + firebase.auth().currentUser.uid )
        .update({
          available: true,
          date: this.dates
        })
        .then(() => {
          console.log("sukses buat schedule1");
          });
        this.angularfireDatabase.object('psg/' + firebase.auth().currentUser.uid + '/scheduling/' + this.dates2 )
        .update({
          session18: true,
        })
        .then(() => {
          console.log("sukses buat schedule1s");
        });
    } 
    if (this.session19){
      this.angularfireDatabase.object('/scheduling/' + this.dates2 + '/session19/' + firebase.auth().currentUser.uid )
      .update({
        available: true,
        date: this.dates

      })
      .then(() => {
        console.log("sukses buat schedule2");
      });

      this.angularfireDatabase.object('psg/' + firebase.auth().currentUser.uid + '/scheduling/' + this.dates2  )
      .update({
        session19: true,
      })
      .then(() => {
        console.log("sukses buat schedule2s");
      });
    } 
    if (this.session20) {
      this.angularfireDatabase.object('/scheduling/' + this.dates2 + '/session20/' + firebase.auth().currentUser.uid )
      .update({
        available: true,
        date: this.dates

      })
      .then(() => {
        console.log("sukses buat schedule3");
      });

      this.angularfireDatabase.object('psg/' + firebase.auth().currentUser.uid + '/scheduling/' + this.dates2 )
      .update({
        session20: true
      })
      .then(() => {
        console.log("sukses buat schedule3s");
      });
    } 
    if (this.session21){
      this.angularfireDatabase.object('/scheduling/' + this.dates2 + '/session21/' + firebase.auth().currentUser.uid )
      .update({
        available: true,
        date: this.dates

      })
      .then(() => {
        console.log("sukses buat schedule4");
      });

      this.angularfireDatabase.object('psg/' + firebase.auth().currentUser.uid + '/scheduling/' + this.dates2 )
      .update({
        session21: true,
      })
      .then(() => {
        console.log("sukses buat schedule4s");
      });
    }
    this.viewCtrl.dismiss(this.event);
    this.loadingProvider.hide();
  }

}
