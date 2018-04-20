import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';
import * as moment from 'moment';
import { DataProvider } from '../../providers/data';
import { AngularFireDatabase } from 'angularfire2/database';
import { LoadingProvider } from '../../providers/loading';
import * as firebase from 'firebase';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Validator } from '../../validator';
import { Validators } from '@angular/forms';

@IonicPage()
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
  dates: any;

  private scheduleForm: FormGroup;


  event = { startTime: new Date().toISOString(), endTime: new Date().toISOString(), allDay: false };
  minDate = new Date().toISOString();

  constructor(public navCtrl: NavController, public navParams: NavParams, public viewCtrl: ViewController,
    public dataProvider: DataProvider, public angularfireDatabase: AngularFireDatabase, public loadingProvider: LoadingProvider,
    public formBuilder: FormBuilder
  ) {


    let preselectedDate = moment(this.navParams.get('selectedDay')).format();
    // let sessionPsg = this.navParams.get('session');
    this.event.startTime = preselectedDate;
    this.event.endTime = preselectedDate;
    this.dates = preselectedDate;
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
      this.loadingProvider.hide();
      this.user = user;
      this.userId = this.user.userId;
      console.log("userScheduling", this.user);
    });
  }

  createScheduling() {
    firebase
      .database()
      .ref("/scheduling/" + firebase.auth().currentUser.uid + '/' + this.dates)
      .once("value")
      .then(account => {
        //console.log(account.val());
        // No database data yet, create user data on database
        if (!account.val()) {
          this.loadingProvider.show();
          // Insert data on our database using AngularFire.
          this.angularfireDatabase.object('/scheduling/' + this.user.userId + '/' + this.dates)
            .set({
              userId: this.userId,
              scheduling: "PSG tes",
              date: this.dates,
              switchStatus: true,
              session1: this.session1,
              session2: this.session2,
              session3: this.session3,
              session4: this.session4,
              session5: this.session5

            })
            .then(() => {
              this.loadingProvider.hide();
              console.log("sukses buat schedule");
              this.viewCtrl.dismiss(this.event);
            });
        }
      });
  }

}
