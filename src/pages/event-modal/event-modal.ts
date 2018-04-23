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
    this.dataProvider.getUser(localStorage.getItem('uid')).subscribe(user => {
      this.loadingProvider.hide();
      this.user = user;
      this.userId = this.user.userId;
      console.log("userScheduling", this.user);
    });
  }

  createScheduling() {
   // firebase
      //.database()
     // .ref("/scheduling/" + this.dates + '/' + )
     // .once("value")
     // .then(account => {
        //console.log(account.val());
        // No database data yet, create user data on database
      //  if (!account.val()) {
          this.loadingProvider.show();
          // Insert data on our database using AngularFire.
          if(this.session1){
              this.angularfireDatabase.object('/scheduling/' + this.dates2 + '/session1/' + localStorage.getItem('uid') )
                .update({
                  available: true,
                  date: this.dates

                })
                .then(() => {
                //  this.loadingProvider.hide();
                  console.log("sukses buat schedule1");
                //  this.viewCtrl.dismiss(this.event);
                });

                this.angularfireDatabase.object('psg/' + localStorage.getItem('uid') + '/scheduling/' + this.dates2 )
                .update({
                  session1: true,
                })
                .then(() => {
                //  this.loadingProvider.hide();
                  console.log("sukses buat schedule1s");
                //  this.viewCtrl.dismiss(this.event);
                });
            } 
             if (this.session2){
                this.angularfireDatabase.object('/scheduling/' + this.dates2 + '/session2/' + localStorage.getItem('uid') )
                .update({
                  available: true,
                  date: this.dates

                })
                .then(() => {
                //  this.loadingProvider.hide();
                  console.log("sukses buat schedule2");
                //  this.viewCtrl.dismiss(this.event);
                });

                this.angularfireDatabase.object('psg/' + localStorage.getItem('uid') + '/scheduling/' + this.dates2  )
                .update({
                  session2: true,
                })
                .then(() => {
                //  this.loadingProvider.hide();
                  console.log("sukses buat schedule2s");
                //  this.viewCtrl.dismiss(this.event);
                });
            } 
             if (this.session3) {
                this.angularfireDatabase.object('/scheduling/' + this.dates2 + '/session3/' + localStorage.getItem('uid') )
                .update({
                  available: true,
                  date: this.dates

                })
                .then(() => {
                //  this.loadingProvider.hide();
                  console.log("sukses buat schedule3");
                //  this.viewCtrl.dismiss(this.event);
                });

                this.angularfireDatabase.object('psg/' + localStorage.getItem('uid') + '/scheduling/' + this.dates2 )
                .update({
                  session3: true
                })
                .then(() => {
                //  this.loadingProvider.hide();
                  console.log("sukses buat schedule3s");
                //  this.viewCtrl.dismiss(this.event);
                });
            } 
             if (this.session4){
                this.angularfireDatabase.object('/scheduling/' + this.dates2 + '/session4/' + localStorage.getItem('uid') )
                .update({
                  available: true,
                  date: this.dates

                })
                .then(() => {
                //  this.loadingProvider.hide();
                  console.log("sukses buat schedule4");
                //  this.viewCtrl.dismiss(this.event);
                });

                this.angularfireDatabase.object('psg/' + localStorage.getItem('uid') + '/scheduling/' + this.dates2 )
                .update({
                  session4: true,
                })
                .then(() => {
                //  this.loadingProvider.hide();
                  console.log("sukses buat schedule4s");
                //  this.viewCtrl.dismiss(this.event);
                });
            } 
             if (this.session5){
                this.angularfireDatabase.object('/scheduling/' + this.dates2 + '/session5/' + localStorage.getItem('uid') )
                .update({
                  available: true,
                  date: this.dates

                })
                .then(() => {
                //  this.loadingProvider.hide();
                  console.log("sukses buat schedule5");
                //  this.viewCtrl.dismiss(this.event);
                });

                this.angularfireDatabase.object('psg/' + localStorage.getItem('uid') + '/scheduling/' + this.dates2 )
                .update({
                  session5: true,
                })
                .then(() => {
                //  this.loadingProvider.hide();
                  console.log("sukses buat schedule5s");
                //  this.viewCtrl.dismiss(this.event);
                });
             }
      ///  }
     // });
     this.loadingProvider.hide();
     this.viewCtrl.dismiss(this.event);
  }

}
