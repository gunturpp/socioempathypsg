import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, ModalController } from 'ionic-angular';
import * as moment from 'moment';
import { EventModalPage } from '../event-modal/event-modal';
import { DataProvider } from "../../providers/data";
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';
import * as firebase from 'firebase';
import { count } from 'rxjs/operator/count';
import { Observable } from 'rxjs/Observable';

@IonicPage()
@Component({
  selector: 'page-calendar',
  templateUrl: 'calendar.html',
})
export class CalendarPage {
  
    cek: number;
    sumSchedules: number;
    lenKey2: any;
    lenKey1: any;
    count: number;
    index: number;
    datedate: void;
  //make a calendar
  eventSource=[];
  viewTitle: string;
  selectedDay = new Date();
  schedules = [];
  sesuatu: any;
  eventz = { startTime: new Date(), endTime: new Date(), allDay: false };


  isToday:boolean;
  calendar = {
        mode: 'month',
        currentDate: new Date()
  };
  
  constructor(public navCtrl: NavController, public navParams: NavParams, private modalCtrl: ModalController, private alertCtrl: AlertController,
    public dataProvider: DataProvider, public angularfireDatabase: AngularFireDatabase
) {
    console.log(this.schedules);
    
  }

  //add event in Calendar function
  addEvent() {
    let modal = this.modalCtrl.create('EventModalPage', {selectedDay: this.selectedDay });
    modal.present();
    // modal.onDidDismiss(data => {
    //   if (data) {
    //     let eventData = data;
        
    //     console.log('data dari didimis',data.startTime);
    //     eventData.startTime = new Date(data.startTime);
    //     console.log('data setelah didmis ',data.startDay);
    //     eventData.endTime = new Date(data.endTime);
 
    //     let events = this.eventSource;
    //     events.push(eventData);
    //     this.eventSource = [];
    //     setTimeout(() => {
    //       this.eventSource = events;
    //       console.log('EVa: ', this.eventSource);
    //     });
    //   }
    // });
  }

  // create random events.
  loadEvents() {
      this.eventSource = this.createRandomEvents();
      console.log(this.eventSource);
  }
  onViewTitleChanged(title) {
      this.viewTitle = title;
  }
  onEventSelected(event) {
    let start = moment(event.startTime).format('LLLL');
    let end = moment(event.endTime).format('LLLL');
       

    let alert = this.alertCtrl.create({
      title: '' + event.title,
      subTitle: 'From: ' + start + '<br>To: ' + end,
      buttons: ['OK']
    })
    alert.present();
  }
  changeMode(mode) {
      this.calendar.mode = mode;
  }
  today() {
      this.calendar.currentDate = new Date();
  }
  onTimeSelected(ev) {
      console.log('Selected time: ' + ev.selectedTime + ', hasEvents: ' +
          (ev.events !== undefined && ev.events.length !== 0) + ', disabled: ' + ev.disabled);
      this.selectedDay = ev.selectedTime;
      console.log('ini waktu sekarang: ' + this.selectedDay);

  }
  // onCurrentDateChanged(event:Date) {
  //     var today = new Date();
  //     today.setHours(0, 0, 0, 0);
  //     event.setHours(0, 0, 0, 0);
  //     this.isToday = today.getTime() === event.getTime();
  // }
  createRandomEvents() {
      var events = [];
      for (var i = 0; i < 50; i += 1) {
          var date = new Date();
          var eventType = Math.floor(Math.random() * 2);
          var startDay = Math.floor(Math.random() * 90) - 45;
          var endDay = Math.floor(Math.random() * 2) + startDay;
          var startTime;
          var endTime;
          if (eventType === 0) {
              startTime = new Date(Date.UTC(date.getUTCFullYear(), date.getUTCMonth(), date.getUTCDate() + startDay));
              if (endDay === startDay) {
                  endDay += 1;
              }
              endTime = new Date(Date.UTC(date.getUTCFullYear(), date.getUTCMonth(), date.getUTCDate() + endDay));
              events.push({
                  title: 'All Day - ' + i,
                  startTime: startTime,
                  endTime: endTime,
                  allDay: true
              });
          } else {
              var startMinute = Math.floor(Math.random() * 24 * 60);
              var endMinute = Math.floor(Math.random() * 180) + startMinute;
              startTime = new Date(date.getFullYear(), date.getMonth(), date.getDate() + startDay, 0, date.getMinutes() + startMinute);
              endTime = new Date(date.getFullYear(), date.getMonth(), date.getDate() + endDay, 0, date.getMinutes() + endMinute);
              events.push({
                  title: 'Event - ' + i,
                  startTime: startTime,
                  endTime: endTime,
                  allDay: false
              });
          }
      }
      return events;
  }
  onRangeChanged(ev) {
      console.log('range changed: startTime: ' + ev.startTime + ', endTime: ' + ev.endTime);
  }
  markDisabled = (date:Date) => {
      var current = new Date();
      current.setHours(0, 0, 0);
      return date < current;
  };

  //ionViewDidEnter(){
    //  console.log(this.schedules);
      
  //}

  ionViewDidEnter() {
    this.cek = 0;
    this.count = 0;
    this.sumSchedules = 0;
    console.log('ionViewDidLoad CalendarPage');
    console.log('tes uid ', localStorage.getItem('uid'));
    console.log('auth2 ', firebase.auth());
    this.dataProvider.getScheduleByUser().subscribe(schedules=>{
        console.log('hasil 2 return ', schedules);
        //first for get date
        for (var i=0; i < schedules.length; i++){
                this.lenKey1 = schedules.length;
                console.log('lenkey1',this.lenKey1);
                this.schedules[i] = schedules[i];
                this.index = 0;
                //get Key date to localstorage
                localStorage.setItem('schedule', this.schedules[i].key);
                
                
                console.log('dalem i', this.schedules)
                  
                        this.dataProvider.getListSchedule(this.schedules[i].key).subscribe(listSchedules=>{
                            this.lenKey2 = listSchedules.length;
                            console.log('lenkey2',this.lenKey2);
                        //second get session
                          for(var j=0; j < listSchedules.length; j++){
                            this.count += 1;
                            var k = this.schedules[this.index].key;
                             console.log('dalem j ', k);
                            if(listSchedules[j].key == "session1"){
                                var x = k+"T08:00:00";
                                var y = k+"T10:00:00";
                                }
                            else if(listSchedules[j].key == "session2"){
                                var x = k+"T10:00:00";
                                var y = k+"T12:00:00";
                                }
                            else if(listSchedules[j].key == "session3"){
                                var x = k+"T12:00:00";
                                var y = k+"T14:00:00";
                                }
                            else if(listSchedules[j].key == "session4"){
                                var x = k+"T14:00:00";
                                var y = k+"T16:00:00";
                                }
                            else if(listSchedules[j].key == "session5"){
                                var x = k+"T16:00:00";
                                var y = k+"T18:00:00";
                                }
                             console.log('list arr', listSchedules[j].key);
                            
                              this.eventSource.push({
                                   //  title: listSchedules[j].key,
                                    title: listSchedules[j].key,
                                    startTime: new Date(x),
                                    endTime: new Date(y),
                                    allDay: false
                                });
                            
                             }
                             //end of second for
                             this.index += 1;
                             console.log('count ', this.count);
                             console.log('index ', this.index);
                             console.log('cek', this.cek);

                            this.cek += 1;
                            if(this.cek == this.lenKey1) {this.refreshData();}
                         });                        
        }
        //end of first for
    });
    //end of subscribe
}
//end of ionViewDidLoad

    //function for refresh array of schedule data
    refreshData(){
        let eventData = this.eventz;
        
       
        eventData.startTime = new Date(12-2-1997);     
        eventData.endTime = new Date(12-2-1997);
 
        let events = this.eventSource;
        events.push(eventData);
        this.eventSource = [];
        setTimeout(() => {
          this.eventSource = events;
          console.log('EVa: ', this.eventSource);
        });
    }
    

}
